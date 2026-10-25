'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { guestbookEntrySchema } from './guestbook-entry.schema';
import { guestbookMessages } from './messages';
import { guestbookRepository } from './repositories/guestbook-repository';
import { describeStorageError } from './repositories/storage-error.util';
import {
  consumeSubmissionSlot,
  resolveClientKey
} from './submission-rate-limiter';

import type { GuestbookEntryInput } from './guestbook-entry.schema';
import type { SignGuestbookResult } from './types/sign-guestbook-result.types';

// The session/role validation rule does not apply here: the guestbook is a
// public form for anonymous wedding guests, so there is no session to check.
// Abuse is mitigated instead by server-side schema validation, the honeypot
// field and a per-client rate limit.
export async function signGuestbookAction(
  input: GuestbookEntryInput
): Promise<SignGuestbookResult> {
  const validated = guestbookEntrySchema.safeParse(input);
  if (!validated.success) {
    return {
      isSuccess: false,
      errorMessage: guestbookMessages.errors.invalidInput
    };
  }

  const clientKey = resolveClientKey(await headers());
  if (!consumeSubmissionSlot(clientKey)) {
    return {
      isSuccess: false,
      errorMessage: guestbookMessages.errors.rateLimited
    };
  }

  try {
    await guestbookRepository.add({
      name: validated.data.name,
      message: validated.data.message
    });
  } catch (error) {
    // eslint-disable-next-line no-console -- server-side diagnostics, no secrets
    console.error(`Guestbook save failed: ${describeStorageError(error)}`);
    return {
      isSuccess: false,
      errorMessage: guestbookMessages.errors.saveFailed
    };
  }

  revalidatePath('/');
  return { isSuccess: true };
}
