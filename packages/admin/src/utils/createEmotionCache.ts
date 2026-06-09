// packages/admin/src/utils/createEmotionCache.ts
// Emotion cache for MUI

import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
