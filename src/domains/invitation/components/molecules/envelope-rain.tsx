import { SealedEnvelopeIcon } from '../atoms/sealed-envelope-icon';

const ENVELOPE_KEYS = Array.from({ length: 7 }, (_, index) => index);

// Decorative cascade of sealed envelopes that float gently (static when the
// user prefers reduced motion).
export function EnvelopeRain() {
  return (
    <div className="envelope-rain" aria-hidden="true">
      {ENVELOPE_KEYS.map(key => (
        <span key={key} className="envelope-rain__item">
          <SealedEnvelopeIcon className="envelope-rain__envelope" />
        </span>
      ))}
    </div>
  );
}
