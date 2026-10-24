'use client';

import { TextArea } from '@/components/atoms/text-area';
import { TextInput } from '@/components/atoms/text-input';
import { FormField, getFieldErrorId } from '@/components/molecules/form-field';
import { Button } from '@/components/ui/button';

import {
  GUESTBOOK_MESSAGE_MAX_LENGTH,
  GUESTBOOK_NAME_MAX_LENGTH
} from '../../guestbook-entry.schema';
import { useGuestbookEntrySubmit } from '../../hooks/use-guestbook-entry-submit';
import { guestbookMessages } from '../../messages';

const NAME_FIELD_ID = 'guestbook-name';
const MESSAGE_FIELD_ID = 'guestbook-message';
const HONEYPOT_FIELD_ID = 'guestbook-website';

export function GuestbookForm() {
  const { register, onSubmit, errors, isSubmitting, isSubmitted } =
    useGuestbookEntrySubmit();
  const { form } = guestbookMessages;

  return (
    <form className="guestbook-form" onSubmit={onSubmit} noValidate>
      <FormField
        controlId={NAME_FIELD_ID}
        label={form.nameLabel}
        errorMessage={errors.name?.message}
      >
        <TextInput
          id={NAME_FIELD_ID}
          autoComplete="name"
          placeholder={form.namePlaceholder}
          maxLength={GUESTBOOK_NAME_MAX_LENGTH}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={
            errors.name ? getFieldErrorId(NAME_FIELD_ID) : undefined
          }
          {...register('name')}
        />
      </FormField>

      <FormField
        controlId={MESSAGE_FIELD_ID}
        label={form.messageLabel}
        errorMessage={errors.message?.message}
      >
        <TextArea
          id={MESSAGE_FIELD_ID}
          rows={5}
          placeholder={form.messagePlaceholder}
          maxLength={GUESTBOOK_MESSAGE_MAX_LENGTH}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? getFieldErrorId(MESSAGE_FIELD_ID) : undefined
          }
          {...register('message')}
        />
      </FormField>

      <div className="guestbook-form__trap" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD_ID}>{form.honeypotLabel}</label>
        <input
          id={HONEYPOT_FIELD_ID}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div aria-live="polite" className="guestbook-form__feedback">
        {errors.root && (
          <p className="guestbook-form__error" role="alert">
            {errors.root.message}
          </p>
        )}
        {isSubmitted && (
          <p className="guestbook-form__success">{form.success}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="guestbook-form__submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? form.submitting : form.submit}
      </Button>
    </form>
  );
}
