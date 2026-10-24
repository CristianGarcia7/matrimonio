import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export function TextArea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      className={cn('form-control', 'form-control--multiline', className)}
      {...props}
    />
  );
}
