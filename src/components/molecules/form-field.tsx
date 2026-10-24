import type { ReactNode } from 'react';

interface FormFieldProps {
  controlId: string;
  label: string;
  errorMessage?: string;
  children: ReactNode;
}

export function getFieldErrorId(controlId: string): string {
  return `${controlId}-error`;
}

export function FormField({
  controlId,
  label,
  errorMessage,
  children
}: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={controlId} className="form-field__label">
        {label}
      </label>
      {children}
      {errorMessage && (
        <p id={getFieldErrorId(controlId)} className="form-field__error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
