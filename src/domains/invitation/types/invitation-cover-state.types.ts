export const INVITATION_COVER_STATE = {
  CLOSED: 'closed',
  OPENING: 'opening',
  OPENED: 'opened'
} as const;

export type InvitationCoverState =
  (typeof INVITATION_COVER_STATE)[keyof typeof INVITATION_COVER_STATE];
