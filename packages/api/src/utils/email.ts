// packages/api/src/utils/email.ts
// Email utilities (supports dev mode and production SMTP)

import nodemailer from 'nodemailer';
import { config } from '../config';
import { logger } from './logger';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  if (config.email.mode === 'production' && config.email.smtp.host) {
    transporter = nodemailer.createTransport({
      host: config.email.smtp.host,
      port: config.email.smtp.port,
      secure: config.email.smtp.port === 465,
      auth: {
        user: config.email.smtp.user,
        pass: config.email.smtp.pass,
      },
    });
    logger.info('Email transporter initialized (production mode)');
  } else {
    logger.info('Email transporter in dev mode (no SMTP)');
  }

  return transporter;
}

export async function sendVerificationEmail(
  email: string,
  code: string
): Promise<void> {
  if (config.email.mode === 'dev') {
    logger.info({ email, code }, 'DEV MODE: Verification code (not sent)');
    return;
  }

  const transport = getTransporter();
  if (!transport) {
    logger.warn('SMTP not configured, cannot send email');
    return;
  }

  try {
    await transport.sendMail({
      from: config.email.smtp.from,
      to: email,
      subject: 'ApplyOnce - Verify Your Email',
      html: `
        <h2>Welcome to ApplyOnce!</h2>
        <p>Your verification code is:</p>
        <h1 style="font-size: 32px; letter-spacing: 4px;">${code}</h1>
        <p>This code expires in 1 hour.</p>
        <p>If you didn't register for ApplyOnce, please ignore this email.</p>
      `,
    });

    logger.info({ email }, 'Verification email sent');
  } catch (error) {
    logger.error({ error, email }, 'Failed to send verification email');
    throw error;
  }
}

export async function sendDecisionNotification(
  email: string,
  universityName: string,
  programmeName: string,
  decision: string,
  reason: string
): Promise<void> {
  if (config.email.mode === 'dev') {
    logger.info(
      { email, universityName, programmeName, decision, reason },
      'DEV MODE: Decision notification (not sent)'
    );
    return;
  }

  const transport = getTransporter();
  if (!transport) {
    logger.warn('SMTP not configured, cannot send email');
    return;
  }

  const isAccepted = decision === 'accepted';
  const subject = isAccepted
    ? `Great news from ${universityName}!`
    : `Update from ${universityName}`;

  try {
    await transport.sendMail({
      from: config.email.smtp.from,
      to: email,
      subject,
      html: `
        <h2>Application Decision</h2>
        <p><strong>University:</strong> ${universityName}</p>
        <p><strong>Programme:</strong> ${programmeName}</p>
        <p><strong>Decision:</strong> <span style="color: ${isAccepted ? '#10B981' : '#F43F5E'}; font-weight: bold;">${decision.toUpperCase()}</span></p>
        <p><strong>Reason:</strong></p>
        <p>${reason}</p>
        <hr />
        <p>View all your applications at <a href="${config.portalUrl}/dashboard">ApplyOnce Dashboard</a></p>
      `,
    });

    logger.info(
      { email, universityName, decision },
      'Decision notification sent'
    );
  } catch (error) {
    logger.error({ error, email }, 'Failed to send decision notification');
    throw error;
  }
}
