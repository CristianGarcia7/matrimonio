import { cn } from '@/lib/utils';

import type {
  GarmentKind,
  PartyColor,
  WeddingPartyRole
} from '../../types/wedding-party-member.types';
import { GarmentIllustration } from '../atoms/garment-illustration';

interface PartyColorSwatch {
  color: PartyColor;
  name: string;
}

interface WeddingPartyCardProps {
  role: WeddingPartyRole;
  name: string;
  description: string;
  garment: GarmentKind;
  hasBoutonniere?: boolean;
  swatches: PartyColorSwatch[];
  swatchesLabel: string;
}

const ROLE_CLASSES: Record<WeddingPartyRole, string> = {
  bride: 'party-card--bride',
  groom: 'party-card--groom',
  bridesmaids: 'party-card--bridesmaids',
  groomsmen: 'party-card--groomsmen',
  flowerGirl: 'party-card--flower-girl',
  pageBoy: 'party-card--page-boy'
};

const SWATCH_CLASSES: Record<PartyColor, string> = {
  ivory: 'party-card__swatch--ivory',
  lightGray: 'party-card__swatch--light-gray',
  darkGray: 'party-card__swatch--dark-gray',
  roseWhite: 'party-card__swatch--rose-white',
  bottleGreen: 'party-card__swatch--bottle-green',
  charcoal: 'party-card__swatch--charcoal',
  blush: 'party-card__swatch--blush',
  white: 'party-card__swatch--white'
};

export function WeddingPartyCard({
  role,
  name,
  description,
  garment,
  hasBoutonniere,
  swatches,
  swatchesLabel
}: WeddingPartyCardProps) {
  return (
    <li className={cn('party-card', ROLE_CLASSES[role])}>
      <GarmentIllustration
        garment={garment}
        hasBoutonniere={hasBoutonniere}
        className="party-card__garment"
      />
      <h4 className="party-card__name">{name}</h4>
      <p className="party-card__description">{description}</p>
      <ul className="party-card__swatches" aria-label={swatchesLabel}>
        {swatches.map(swatch => (
          <li key={swatch.color} className="party-card__swatch-item">
            <span
              className={cn('party-card__swatch', SWATCH_CLASSES[swatch.color])}
              aria-hidden="true"
            />
            <span className="sr-only">{swatch.name}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}
