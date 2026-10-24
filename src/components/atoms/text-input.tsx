import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

export function TextInput({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input type="text" className={cn('form-control', className)} {...props} />
  );
}
