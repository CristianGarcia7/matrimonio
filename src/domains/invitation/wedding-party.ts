import type { WeddingPartyMember } from './types/wedding-party-member.types';

// Wedding party attire, in the order shown on the invitation.
export const WEDDING_PARTY: WeddingPartyMember[] = [
  { role: 'bride', garment: 'gown', colors: ['ivory'] },
  {
    role: 'groom',
    garment: 'suit',
    hasBoutonniere: true,
    colors: ['lightGray', 'darkGray', 'roseWhite']
  },
  { role: 'bridesmaids', garment: 'slipDress', colors: ['bottleGreen'] },
  { role: 'groomsmen', garment: 'suit', colors: ['charcoal', 'bottleGreen'] },
  {
    role: 'flowerGirl',
    garment: 'tulleDress',
    colors: ['blush', 'bottleGreen']
  },
  {
    role: 'pageBoy',
    garment: 'boyOutfit',
    colors: ['white', 'blush', 'bottleGreen', 'charcoal']
  }
];
