export interface Parent {
  name: string;
  // Parents who have passed away are honoured with a star and a heaven note.
  isInHeaven?: boolean;
  // Screen-reader text read right after the name, e.g. "(fallecido)".
  remembranceLabel?: string;
}
