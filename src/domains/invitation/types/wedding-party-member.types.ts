export type WeddingPartyRole =
  | 'bride'
  | 'groom'
  | 'bridesmaids'
  | 'groomsmen'
  | 'flowerGirl'
  | 'pageBoy';

export type GarmentKind =
  | 'gown'
  | 'suit'
  | 'slipDress'
  | 'tulleDress'
  | 'boyOutfit';

export type PartyColor =
  | 'ivory'
  | 'lightGray'
  | 'darkGray'
  | 'roseWhite'
  | 'bottleGreen'
  | 'charcoal'
  | 'blush'
  | 'white';

export interface WeddingPartyMember {
  role: WeddingPartyRole;
  garment: GarmentKind;
  hasBoutonniere?: boolean;
  colors: PartyColor[];
}
