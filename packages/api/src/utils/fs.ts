// packages/api/src/utils/fs.ts
// Non-blocking filesystem helpers for use inside request handlers.
// fs.existsSync/unlinkSync block the event loop for every concurrent
// request; these use fs.promises so a slow disk doesn't stall the server.

import fs from 'fs';

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Deletes a file if it exists; silently no-ops if it's already gone.
export async function safeUnlink(filePath: string): Promise<void> {
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      throw error;
    }
  }
}
