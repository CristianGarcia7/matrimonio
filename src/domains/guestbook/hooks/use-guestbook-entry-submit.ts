'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signGuestbookAction } from '../actions';
import { guestbookEntrySchema } from '../guestbook-entry.schema';
import { guestbookMessages } from '../messages';

import type { GuestbookEntryInput } from '../guestbook-entry.schema';

export function useGuestbookEntrySubmit() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<GuestbookEntryInput>({
    resolver: zodResolver(guestbookEntrySchema),
    defaultValues: { name: '', message: '', website: '' }
  });

  const onSubmit = handleSubmit(async data => {
    setIsSubmitted(false);

    try {
      const result = await signGuestbookAction(data);
      if (!result.isSuccess) {
        setError('root', { message: result.errorMessage });
        return;
      }
      reset();
      setIsSubmitted(true);
    } catch {
      setError('root', { message: guestbookMessages.errors.unexpected });
    }
  });

  return { register, onSubmit, errors, isSubmitting, isSubmitted };
}
