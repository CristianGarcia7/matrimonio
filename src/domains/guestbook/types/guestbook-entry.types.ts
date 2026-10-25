export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface NewGuestbookEntry {
  name: string;
  message: string;
}

// Serializable view of a signature handed to the client-side book: only the
// public fields plus the server-formatted date (avoids hydration drift).
export interface GuestbookBookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  formattedDate: string;
}
