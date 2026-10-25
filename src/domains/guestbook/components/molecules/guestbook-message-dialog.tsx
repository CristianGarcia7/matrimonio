'use client';

import { useEffect, useRef } from 'react';

import { guestbookMessages } from '../../messages';

import type { GuestbookBookEntry } from '../../types/guestbook-entry.types';

interface GuestbookMessageDialogProps {
  entry: GuestbookBookEntry | null;
  onClose: () => void;
}

const DIALOG_TITLE_ID = 'guestbook-message-dialog-title';

// Native modal dialog with the full text of a clamped signature. The
// browser traps focus, closes on Escape and restores focus to the
// "Leer más" button that opened it.
export function GuestbookMessageDialog({
  entry,
  onClose
}: GuestbookMessageDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { signatures } = guestbookMessages;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (entry && dialog && !dialog.open) dialog.showModal();
  }, [entry]);

  const handleCloseClick = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      className="guestbook-message-dialog"
      aria-labelledby={DIALOG_TITLE_ID}
      onClose={onClose}
    >
      {entry && (
        <div className="guestbook-message-dialog__body">
          <h4 id={DIALOG_TITLE_ID} className="guestbook-message-dialog__title">
            {signatures.messageDialogTitle(entry.name)}
          </h4>
          <blockquote className="guestbook-message-dialog__message">
            {entry.message}
          </blockquote>
          <time
            className="guestbook-message-dialog__date"
            dateTime={entry.createdAt}
          >
            {entry.formattedDate}
          </time>
          <button
            type="button"
            className="guestbook-message-dialog__close"
            onClick={handleCloseClick}
          >
            {signatures.closeMessage}
          </button>
        </div>
      )}
    </dialog>
  );
}
