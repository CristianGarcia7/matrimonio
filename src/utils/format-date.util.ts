export function formatDateTime(
  isoDate: string,
  locale: string,
  timeZone: string
): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone
  }).format(new Date(isoDate));
}
