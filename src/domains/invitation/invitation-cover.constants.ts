// Dispatched on `window` when a guest opens the envelope. It fires inside the
// click/keyboard handler so listeners (e.g. background music) still run within
// the user gesture that browsers require for audio playback.
export const INVITATION_OPENED_EVENT = 'invitation:opened';

// Wrapper made inert while the cover is shown.
export const INVITATION_CONTENT_ID = 'invitation-content';

// Receives focus once the cover is dismissed.
export const INVITATION_MAIN_ID = 'main-content';
