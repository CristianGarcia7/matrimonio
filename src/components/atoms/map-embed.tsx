import { cn } from '@/lib/utils';

interface MapEmbedProps {
  src: string;
  title: string;
  className?: string;
}

export function MapEmbed({ src, title, className }: MapEmbedProps) {
  return (
    <div className={cn('map-embed', className)}>
      <iframe
        className="map-embed__frame"
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
