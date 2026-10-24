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
