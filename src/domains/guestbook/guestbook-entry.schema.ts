import { z } from 'zod';

import { guestbookValidationMessages } from './validation-messages';

export const GUESTBOOK_NAME_MIN_LENGTH = 2;
export const GUESTBOOK_NAME_MAX_LENGTH = 60;
export const GUESTBOOK_MESSAGE_MIN_LENGTH = 2;
export const GUESTBOOK_MESSAGE_MAX_LENGTH = 500;

export const guestbookEntrySchema = z.object({
  name: z
    .string()
    .trim()
    .min(GUESTBOOK_NAME_MIN_LENGTH, {
      error: guestbookValidationMessages.nameTooShort
    })
    .max(GUESTBOOK_NAME_MAX_LENGTH, {
      error: guestbookValidationMessages.nameTooLong
    }),
  message: z
    .string()
    .trim()
    .min(GUESTBOOK_MESSAGE_MIN_LENGTH, {
      error: guestbookValidationMessages.messageTooShort
    })
    .max(GUESTBOOK_MESSAGE_MAX_LENGTH, {
      error: guestbookValidationMessages.messageTooLong
    }),
  // Honeypot: hidden from people, usually filled by bots. Must stay empty.
  website: z
    .string()
    .max(0, { error: guestbookValidationMessages.honeypotFilled })
});

export type GuestbookEntryInput = z.infer<typeof guestbookEntrySchema>;
