const MS_PER_SECOND = 1000;
const MS_PER_MINUTE = 60 * MS_PER_SECOND;
const MS_PER_HOUR = 60 * MS_PER_MINUTE;
const MS_PER_DAY = 24 * MS_PER_HOUR;

export interface TimeRemaining {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getTimeRemaining(
  targetMs: number,
  nowMs: number
): TimeRemaining {
  const totalMs = Math.max(targetMs - nowMs, 0);

  return {
    totalMs,
    days: Math.floor(totalMs / MS_PER_DAY),
    hours: Math.floor((totalMs % MS_PER_DAY) / MS_PER_HOUR),
    minutes: Math.floor((totalMs % MS_PER_HOUR) / MS_PER_MINUTE),
    seconds: Math.floor((totalMs % MS_PER_MINUTE) / MS_PER_SECOND)
  };
}
