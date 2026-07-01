// packages/api/src/controllers/payment.ts
// Payment initiation and webhook handling

import { Response } from 'express';
import { AuthRequest } from '../types/express';
import { asyncHandler } from '../utils/asyncHandler';
import { prisma } from '../utils/prisma';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { InitiatePaymentInput, PaymentNotificationInput } from '../schemas/payment';
import { SERVICE_FEE_ZAR } from '@applyonce/shared';
import { submitMultipleApplications } from '../workflows/submission';
import { logger } from '../utils/logger';

/**
 * POST /v1/payments/initiate
 * Initiate payment for one or more draft applications
 *
 * Rules:
 * - All applications must be drafts
 * - All applications must belong to the logged-in student
 * - Student must have uploaded matric certificate + ID document
 * - Creates a Payment record and returns mock checkout URL
 */
export const initiatePayment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const studentId = req.student!.studentId;
    const input = req.body as InitiatePaymentInput;
    const { applicationIds, returnUrl, cancelUrl } = input;

    // Fetch student to check documents
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        documents: {
          where: {
            type: { in: ['id_document', 'matric_certificate'] },
          },
        },
      },
    });

    if (!student) {
      throw new NotFoundError('Student not found');
    }

    // Check required documents
    const hasIdDocument = student.documents.some((d) => d.type === 'id_document');
    const hasMatricCertificate = student.documents.some((d) => d.type === 'matric_certificate');

    if (!hasIdDocument || !hasMatricCertificate) {
      throw new BadRequestError(
        'You must upload your ID document and matric certificate before submitting applications.'
      );
    }

    // Fetch all applications
    const applications = await prisma.application.findMany({
      where: {
        id: { in: applicationIds },
      },
      include: {
        university: true,
      },
    });

    // Validate ownership
    const notOwned = applications.filter((app) => app.studentId !== studentId);
    if (notOwned.length > 0) {
      throw new BadRequestError('You can only pay for your own applications');
    }

    // Validate all are drafts
    const notDrafts = applications.filter((app) => app.status !== 'draft');
    if (notDrafts.length > 0) {
      throw new BadRequestError('Only draft applications can be paid for');
    }

    if (applications.length === 0) {
      throw new BadRequestError('No valid applications found');
    }

    // Calculate fees
    const breakdown = applications.map((app) => ({
      applicationId: app.id,
      universityId: app.universityId,
      universityName: app.universityName,
      programmeName: app.programmeName,
      applicationFeeZAR: app.university.applicationFeeZAR,
      serviceFeeZAR: SERVICE_FEE_ZAR,
      totalZAR: app.university.applicationFeeZAR + SERVICE_FEE_ZAR,
    }));

    const universityFeesZAR = breakdown.reduce((sum, b) => sum + b.applicationFeeZAR, 0);
    const serviceFeesZAR = breakdown.reduce((sum, b) => sum + b.serviceFeeZAR, 0);
    const totalAmountZAR = universityFeesZAR + serviceFeesZAR;

    // Create payment record + link applications atomically
    // Transaction prevents orphaned payment if linking fails
    const payment = await prisma.$transaction(async (tx) => {
      const newPayment = await tx.payment.create({
        data: {
          studentId,
          totalAmountZAR,
          universityFeesZAR,
          serviceFeesZAR,
          status: 'pending',
          gateway: 'mock',
          breakdown,
        },
      });

      // Link applications to payment
      await tx.application.updateMany({
        where: {
          id: { in: applicationIds },
        },
        data: {
          paymentId: newPayment.id,
        },
      });

      return newPayment;
    });

    // Build mock PayGate URL
    const mockPaymentUrl = `https://sandbox.paygate.co.za/eng/process?payment_id=${payment.id}&amount=${totalAmountZAR}&return_url=${encodeURIComponent(returnUrl)}&cancel_url=${encodeURIComponent(cancelUrl)}`;

    res.json({
      payment: {
        id: payment.id,
        paymentUrl: mockPaymentUrl,
        totalAmountZAR: Number(payment.totalAmountZAR),
        universityFeesZAR: Number(payment.universityFeesZAR),
        serviceFeesZAR: Number(payment.serviceFeesZAR),
        breakdown,
      },
    });
  }
);

/**
 * POST /v1/payments/notify
 * Mock PayGate webhook (ITN - Instant Transaction Notification)
 *
 * In production, this is called by PayGate when payment completes.
 * In dev/mock mode, the frontend calls this to simulate payment completion.
 *
 * On successful payment:
 * - Updates payment status to 'complete'
 * - Triggers submission engine to submit all paid applications
 */
export const handlePaymentNotification = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const input = req.body as PaymentNotificationInput;
    const { paymentId, status, gatewayReference } = input;

    // Fetch payment with applications
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        applications: true,
      },
    });

    if (!payment) {
      throw new NotFoundError('Payment not found');
    }

    if (payment.status !== 'pending') {
      logger.warn({ paymentId, currentStatus: payment.status }, 'Payment already processed');
      return res.json({
        success: true,
        message: 'Payment already processed',
      });
    }

    // Map gateway status to our status
    const statusMap: Record<string, string> = {
      COMPLETE: 'complete',
      FAILED: 'failed',
      CANCELLED: 'cancelled',
    };

    const newStatus = statusMap[status];

    // Update payment
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        status: newStatus,
        gatewayReference,
        paidAt: status === 'COMPLETE' ? new Date() : undefined,
      },
    });

    logger.info({ paymentId, status: newStatus }, 'Payment status updated');

    // If payment succeeded, submit applications
    if (status === 'COMPLETE') {
      const applicationIds = payment.applications.map((app) => app.id);

      logger.info(
        { paymentId, applicationCount: applicationIds.length },
        'Payment complete - triggering submission engine'
      );

      // Submit applications (runs in background)
      submitMultipleApplications(applicationIds, payment.studentId)
        .then((result) => {
          if (result.failed.length > 0) {
            logger.warn(
              {
                paymentId,
                succeeded: result.succeeded.length,
                failed: result.failed.length,
                failedApplicationIds: result.failed,
              },
              'Payment complete but some applications failed to submit - check application status for details'
            );
          } else {
            logger.info(
              {
                paymentId,
                succeeded: result.succeeded.length,
              },
              'All applications submitted successfully'
            );
          }
        })
        .catch((error) => {
          logger.error(
            { paymentId, error: error.message, stack: error.stack },
            'Submission engine encountered unexpected error'
          );
        });

      return res.json({
        success: true,
        message: 'Payment confirmed. Applications are being submitted.',
        submittedApplications: applicationIds.length,
      });
    } else {
      return res.json({
        success: true,
        message: `Payment ${newStatus}`,
      });
    }
  }
);

/**
 * GET /v1/payments/:id
 * Get payment details
 */
export const getPayment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const studentId = req.student!.studentId;
  const { id } = req.params;

  const payment = await prisma.payment.findUnique({
    where: { id },
    include: {
      applications: {
        select: {
          id: true,
          universityName: true,
          programmeName: true,
          status: true,
        },
      },
    },
  });

  if (!payment) {
    throw new NotFoundError('Payment not found');
  }

  if (payment.studentId !== studentId) {
    throw new BadRequestError('You can only view your own payments');
  }

  res.json({
    payment: {
      id: payment.id,
      totalAmountZAR: Number(payment.totalAmountZAR),
      universityFeesZAR: Number(payment.universityFeesZAR),
      serviceFeesZAR: Number(payment.serviceFeesZAR),
      status: payment.status,
      gateway: payment.gateway,
      gatewayReference: payment.gatewayReference,
      breakdown: payment.breakdown,
      applications: payment.applications,
      paidAt: payment.paidAt?.toISOString(),
      createdAt: payment.createdAt.toISOString(),
    },
  });
});
