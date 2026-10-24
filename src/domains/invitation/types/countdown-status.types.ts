export const COUNTDOWN_STATUS = {
  PENDING: 'pending',
  COUNTING: 'counting',
  EVENT_DAY: 'event-day',
  FINISHED: 'finished'
} as const;

export type CountdownStatus =
  (typeof COUNTDOWN_STATUS)[keyof typeof COUNTDOWN_STATUS];
