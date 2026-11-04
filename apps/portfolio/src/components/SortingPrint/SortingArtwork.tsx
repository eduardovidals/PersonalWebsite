import { useId } from 'react';
import type { SortingFrame } from './sequence';

// The bases follow the lip of a shallow ellipse rather than a flat axis.
const sockets = [
  [72, 205],
  [135, 230],
  [199, 252],
  [264, 269],
  [329, 279],
  [394, 281],
  [458, 273],
] as const;

const materials = {
  iris: ['#6c66a9', '#ebdcff', '#bcacff', '#826acc', '#403664', '#aa9be5'],
  lilac: ['#9280b9', '#fff1ff', '#dec4ef', '#aa8cbd', '#5e4d7a', '#c8acd8'],
  periwinkle: ['#666d9d', '#e2e8ff', '#b0bcff', '#808aca', '#3f446e', '#aab2dc'],
  coral: ['#b1738d', '#fff1dc', '#ffccb2', '#ea9b99', '#88596f', '#e2a8af'],
} as const;
type Material = keyof typeof materials;

function Stack({
  height,
  column,
  accent,
  uid,
}: {
  height: number;
  column: number;
  accent: boolean;
  uid: string;
}) {
  const [x, y] = sockets[column];
  const finish: Material = accent
    ? 'coral'
    : (['iris', 'lilac', 'periwinkle'] as const)[height % 3];
  const tones = materials[finish];
  return (
    <g
      data-height={height}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      className="transition-transform duration-500 ease-out motion-reduce:transition-none"
    >
      {Array.from({ length: height }, (_, layer) => (
        <g key={layer} transform={`translate(0 ${-22 * layer})`}>
          <path
            d="M-29 -13 C-29 -27 29 -27 29 -13 L29 -6 C29 8 -29 8 -29 -6Z"
            fill={`url(#${uid}-${finish})`}
          />
          <ellipse cy="-13" rx="29" ry="10.5" fill={tones[2]} />
          <ellipse cy="-13" rx="29" ry="10.5" fill={`url(#${uid}-pearl)`} />
          <ellipse cy="-13" rx="10.7" ry="3.9" fill={tones[4]} />
          <path
            d="M-27 -15C-22 -22 -4 -24 8 -22"
            fill="none"
            stroke={tones[1]}
            strokeWidth="1"
            strokeOpacity=".8"
          />
        </g>
      ))}
    </g>
  );
}

function Light({ uid }: { uid: string }) {
  return (
    <defs>
      {Object.entries(materials).map(([name, tones]) => (
        <linearGradient
          key={name}
          id={`${uid}-${name}`}
          x1="0"
          y1=".4"
          x2="1"
          y2=".49"
          gradientUnits="objectBoundingBox"
        >
          {[0, 0.19, 0.41, 0.64, 0.87, 1].map((position, i) => (
            <stop key={position} offset={position} stopColor={tones[i]} />
          ))}
        </linearGradient>
      ))}
      <radialGradient
        id={`${uid}-pearl`}
        cx="26%"
        cy="6%"
        r="87%"
        gradientTransform="rotate(7 .5 .5)"
      >
        <stop stopColor="#fff8f1" stopOpacity=".71" />
        <stop offset=".5" stopColor="#f1cfff" stopOpacity=".16" />
        <stop offset="1" stopColor="#e5deff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${uid}-pool`}>
        <stop stopColor="#9b8acf" stopOpacity=".23" />
        <stop offset=".6" stopColor="#8a7da8" stopOpacity=".15" />
        <stop offset="1" stopColor="#746c9c" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${uid}-warm`}>
        <stop stopColor="#f6b9a9" stopOpacity=".45" />
        <stop offset="1" stopColor="#bb90af" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${uid}-orbit`} x1="0" y1="1" x2=".9" y2="0">
        <stop stopColor="#bdacf2" stopOpacity="0" />
        <stop offset=".25" stopColor="#c9b5ea" stopOpacity=".65" />
        <stop offset=".49" stopColor="#f1ccbe" stopOpacity=".07" />
        <stop offset=".8" stopColor="#a1b3ef" stopOpacity=".36" />
        <stop offset="1" stopColor="#afa7d0" stopOpacity="0" />
      </linearGradient>
      <filter id={`${uid}-soft`} x="-70%" y="-80%" width="260%" height="270%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
    </defs>
  );
}

export function SortingArtwork({ frame }: { frame: SortingFrame }) {
  const uid = useId();
  const title = `${uid}-title`;
  const desc = `${uid}-desc`;
  return (
    <svg
      viewBox="0 0 540 344"
      className="block h-auto w-full overflow-visible"
      role="img"
      aria-labelledby={title}
      aria-describedby={desc}
    >
      <title id={title}>Floating sorting sculpture</title>
      <desc id={desc}>
        Seven floating stacks of rings. Ring counts from left to right: {frame.heights.join(', ')}.
        {frame.nextPair === null
          ? ' Sorted from shortest to tallest.'
          : ' The two peach stacks swap next.'}
      </desc>
      <Light uid={uid} />
      <g aria-hidden="true">
        <ellipse
          cx="272"
          cy="247"
          rx="264"
          ry="85"
          transform="rotate(9 272 247)"
          fill={`url(#${uid}-pool)`}
        />
        <ellipse
          cx="273"
          cy="249"
          rx="241"
          ry="53"
          transform="rotate(9 273 249)"
          stroke={`url(#${uid}-orbit)`}
          strokeWidth="1"
          fill="none"
        />
        {sockets.map(([x, y], i) => {
          const active =
            frame.nextPair !== null && (i === frame.nextPair || i === frame.nextPair + 1);
          return (
            <g key={i}>
              {active && <ellipse cx={x} cy={y + 7} rx="65" ry="24" fill={`url(#${uid}-warm)`} />}
              <ellipse
                cx={x + 8}
                cy={y + 11}
                rx="29"
                ry="7"
                transform={`rotate(-9 ${x + 8} ${y + 11})`}
                fill="#090910"
                opacity=".75"
                filter={`url(#${uid}-soft)`}
              />
            </g>
          );
        })}
        {frame.heights.map((height, i) => (
          <Stack
            key={height}
            height={height}
            column={i}
            uid={uid}
            accent={frame.nextPair !== null && (i === frame.nextPair || i === frame.nextPair + 1)}
          />
        ))}
      </g>
    </svg>
  );
}
