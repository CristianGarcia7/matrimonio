'use client';

import { useState } from 'react';

interface FlipValueState {
  current: string;
  previous: string;
  flipCount: number;
}

// Remembers the value shown before the latest change so a flip card can
// animate from the old digits to the new ones. State is adjusted during render
// (React's derived-state pattern), so no effect or extra paint is needed.
export function useFlipValue(value: string) {
  const [state, setState] = useState<FlipValueState>({
    current: value,
    previous: value,
    flipCount: 0
  });

  if (state.current !== value) {
    setState({
      current: value,
      previous: state.current,
      flipCount: state.flipCount + 1
    });
  }

  return { previousValue: state.previous, flipKey: state.flipCount };
}
