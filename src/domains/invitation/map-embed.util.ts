import type { GeoCoordinates } from './types/geo-coordinates.types';

const MAP_EMBED_BASE_URL = 'https://maps.google.com/maps';
const MAP_EMBED_ZOOM = 17;

export function buildMapEmbedUrl({ latitude, longitude }: GeoCoordinates) {
  return `${MAP_EMBED_BASE_URL}?q=${latitude},${longitude}&z=${MAP_EMBED_ZOOM}&output=embed`;
}
