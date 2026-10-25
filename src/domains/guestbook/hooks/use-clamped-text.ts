'use client';

import { useEffect, useRef, useState } from 'react';

// Reports whether a line-clamped element hides part of its text. The
// ResizeObserver also fires once right after `observe`, which covers the
// initial measurement.
export function useClampedText<T extends HTMLElement>() {
  const textRef = useRef<T>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      setIsClamped(element.scrollHeight > element.clientHeight + 1);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { textRef, isClamped };
}
