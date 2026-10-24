interface HydrangeaFloretProps {
  x: number;
  y: number;
  rotation?: number;
  scale?: number;
}

// Four-petal floret drawn around the origin; meant to live inside an <svg>.
const FLORET_PETALS_PATH =
  'M0 0C-2.2-1.2-2-4.4 0-4.6 2-4.4 2.2-1.2 0 0ZM0 0C1.2-2.2 4.4-2 4.6 0 4.4 2 1.2 2.2 0 0ZM0 0C2.2 1.2 2 4.4 0 4.6-2 4.4-2.2 1.2 0 0ZM0 0C-1.2 2.2-4.4 2-4.6 0-4.4-2-1.2-2.2 0 0Z';

export function HydrangeaFloret({
  x,
  y,
  rotation = 0,
  scale = 1
}: HydrangeaFloretProps) {
  return (
    <g
      className="hydrangea-floret"
      transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}
    >
      <path className="hydrangea-floret__petals" d={FLORET_PETALS_PATH} />
      <circle className="hydrangea-floret__center" r="0.8" />
    </g>
  );
}
