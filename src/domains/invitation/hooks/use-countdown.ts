'use client';

import { useSyncExternalStore } from 'react';

import { invitationMessages } from '../messages';
import { CEREMONY_START_ISO, WEDDING_DAY_END_ISO } from '../wedding-details';
import { getTimeRemaining } from '@/utils/time-remaining.util';

import { COUNTDOWN_STATUS } from '../types/countdown-status.types';
import type { CountdownStatus } from '../types/countdown-status.types';
import type { CountdownUnitValue } from '../types/countdown-unit.types';

const TICK_INTERVAL_MS = 1000;
const CEREMONY_START_MS = new Date(CEREMONY_START_ISO).getTime();
const WEDDING_DAY_END_MS = new Date(WEDDING_DAY_END_ISO).getTime();

function subscribeToClock(onTick: () => void) {
  const intervalId = window.setInterval(onTick, TICK_INTERVAL_MS);
  return () => window.clearInterval(intervalId);
}

// Snapshot is rounded to whole seconds so it stays stable between renders.
function getClockSnapshot(): number {
  return Math.floor(Date.now() / TICK_INTERVAL_MS) * TICK_INTERVAL_MS;
}

// The server has no reliable "now" for the visitor; render a placeholder
// until the client hydrates to avoid hydration mismatches.
function getServerClockSnapshot(): null {
  return null;
}

function padUnit(value: number): string {
  return String(value).padStart(2, '0');
}

function resolveStatus(nowMs: number | null): CountdownStatus {
  if (nowMs === null) return COUNTDOWN_STATUS.PENDING;
  if (nowMs < CEREMONY_START_MS) return COUNTDOWN_STATUS.COUNTING;
  if (nowMs < WEDDING_DAY_END_MS) return COUNTDOWN_STATUS.EVENT_DAY;
  return COUNTDOWN_STATUS.FINISHED;
}

export function useCountdown() {
  const nowMs = useSyncExternalStore<number | null>(
    subscribeToClock,
    getClockSnapshot,
    getServerClockSnapshot
  );
  const status = resolveStatus(nowMs);
  const { units, placeholder } = invitationMessages.countdown;
  const remaining =
    nowMs === null ? null : getTimeRemaining(CEREMONY_START_MS, nowMs);

  const formatValue = (value: number | undefined) =>
    value === undefined ? placeholder : padUnit(value);

  const countdownUnits: CountdownUnitValue[] = [
    { key: 'days', label: units.days, value: formatValue(remaining?.days) },
    { key: 'hours', label: units.hours, value: formatValue(remaining?.hours) },
    {
      key: 'minutes',
      label: units.minutes,
      value: formatValue(remaining?.minutes)
    },
    {
      key: 'seconds',
      label: units.seconds,
      value: formatValue(remaining?.seconds)
    }
  ];

  return {
    status,
    countdownUnits,
    isPending: status === COUNTDOWN_STATUS.PENDING
  };
}
