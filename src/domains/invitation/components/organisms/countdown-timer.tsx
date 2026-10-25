'use client';

import { Fragment } from 'react';

import { cn } from '@/lib/utils';

import { useCountdown } from '../../hooks/use-countdown';
import { invitationMessages } from '../../messages';
import { CountdownUnit } from '../molecules/countdown-unit';

import { COUNTDOWN_STATUS } from '../../types/countdown-status.types';

export function CountdownTimer() {
  const { status, countdownUnits, isPending } = useCountdown();
  const { countdown } = invitationMessages;

  if (status === COUNTDOWN_STATUS.EVENT_DAY) {
    return (
      <div className="countdown-timer__message">
        <p className="countdown-timer__headline">{countdown.eventDay}</p>
        <p className="countdown-timer__detail">{countdown.eventDayDetail}</p>
      </div>
    );
  }

  if (status === COUNTDOWN_STATUS.FINISHED) {
    return (
      <div className="countdown-timer__message">
        <p className="countdown-timer__headline">{countdown.finished}</p>
        <p className="countdown-timer__detail">{countdown.finishedDetail}</p>
      </div>
    );
  }

  return (
    <div
      role="timer"
      aria-label={countdown.ariaLabel}
      aria-busy={isPending}
      className={cn('countdown-timer', isPending && 'countdown-timer--pending')}
    >
      {countdownUnits.map((unit, index) => (
        <Fragment key={unit.key}>
          {index > 0 && (
            <span className="countdown-timer__separator" aria-hidden="true" />
          )}
          <CountdownUnit value={unit.value} label={unit.label} />
        </Fragment>
      ))}
    </div>
  );
}
