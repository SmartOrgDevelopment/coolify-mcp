/**
 * Live validation for HTTP OAuth's permission proof. The empty project body is
 * rejected before project creation, so this probe cannot mutate the instance.
 *
 * Run with: npm run test:integration
 */

import { expect, it } from '@jest/globals';
import { validateCoolifyToken } from '../../lib/http-server.js';
import {
  COOLIFY_TOKEN,
  COOLIFY_URL,
  describeIf,
  hasCredentials,
  warnIfSkipped,
} from './helpers.js';

warnIfSkipped('http-permission-probes.integration');

describeIf(hasCredentials)('HTTP OAuth permission proofs', () => {
  it('accepts a token only after non-mutating read, write, and deploy proofs', async () => {
    await expect(
      validateCoolifyToken(COOLIFY_URL as string, COOLIFY_TOKEN as string),
    ).resolves.toMatchObject({ ok: true });
  });
});
