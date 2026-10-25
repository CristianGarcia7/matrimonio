// Shared line-art pieces for the gold botanicals. Each shape is drawn around
// its own origin and placed with x/y/rotation, so bouquets and branches are
// composed from data instead of long path dumps.

interface PlacedShapeProps {
  x: number;
  y: number;
  rotation?: number;
  scale?: number;
}

function placeShape({ x, y, rotation = 0, scale = 1 }: PlacedShapeProps) {
  return `translate(${x} ${y}) rotate(${rotation}) scale(${scale})`;
}

// Slender olive/willow leaf pointing up from its base, with a midrib.
export function BotanicalLeaf(props: PlacedShapeProps) {
  return (
    <g transform={placeShape(props)}>
      <path
        className="botanical__fill"
        d="M0 0C-4.6-5.5-4.6-13.5 0-20C4.6-13.5 4.6-5.5 0 0Z"
      />
      <path className="botanical__vein" d="M0-1.5V-17" />
    </g>
  );
}

// Round eucalyptus leaf on a short petiole.
export function BotanicalRoundLeaf(props: PlacedShapeProps) {
  return (
    <g transform={placeShape(props)}>
      <path className="botanical__stroke" d="M0 0v-3" />
      <ellipse className="botanical__fill" cx="0" cy="-8.5" rx="5" ry="5.6" />
    </g>
  );
}

// Open garden rose seen from above: outer petals and an inner spiral.
export function BotanicalRose(props: PlacedShapeProps) {
  return (
    <g transform={placeShape(props)}>
      <path
        className="botanical__fill"
        d="M-11 1C-12-7-5-12.5 2-11.5C9.5-10.5 13-3 10 4C7 10.5-2.5 12-8 7.5C-10 5.8-10.8 3.6-11 1Z"
      />
      <path
        className="botanical__stroke"
        d="M-6 1C-6.5-4-2-7.5 3-6.5C7-5.5 7.5-.5 5.5 2.8C3.5 6-1.5 6.3-3.3 3.3C-4.6 1-2.8-1.6-.3-1.2M-11 1C-8.5 3-6 3.5-3.3 3.3M10 4C7.5 2.5 6.6 2.8 5.5 2.8M2-11.5C2.5-9 2.9-7.6 3-6.5"
      />
    </g>
  );
}

// Closed rosebud with its sepals.
export function BotanicalBud(props: PlacedShapeProps) {
  return (
    <g transform={placeShape(props)}>
      <path
        className="botanical__fill"
        d="M0 0C-5-2-6-8-3.5-12C-2-14.5 2-14.5 3.5-12C6-8 5-2 0 0Z"
      />
      <path
        className="botanical__stroke"
        d="M0 0C-1.5-4-1-9 1.5-12.5M0 0C-4 1-6.5-1.5-7-4M0 0C4 1 6.5-1.5 7-4"
      />
    </g>
  );
}
