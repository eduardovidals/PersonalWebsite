import { useId } from 'react';
import type { PrintFrame } from './sequence';

const ink = '#17246f';
const cream = '#fff0c8';
const apricot = '#ffa477';
const plane = '#aeb6ff';
const width = 0.74;

/** Project the three axes into a single drawing space, shared by blocks, grid and shadows. */
function point(column: number, depth: number, height = 0) {
  return [79 + column * 51 + depth * 28, 151 + column * 25.5 - depth * 14 - height * 19.8].join(
    ',',
  );
}

function Registration({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} stroke={cream} opacity=".8" fill="none" strokeWidth=".85">
      <circle r="3.7" />
      <path d="M-8 0H8 M0-8V8" />
    </g>
  );
}

function DrawingBoard() {
  const crossRules = Array.from({ length: 17 }, (_, n) => {
    const pos = -0.65 + n * 0.5;
    return <line key={n} x1={pos} y1="-1.2" x2={pos} y2="2.15" vectorEffect="non-scaling-stroke" />;
  });
  const longRules = Array.from({ length: 7 }, (_, n) => {
    const pos = -1.2 + n * 0.5;
    return (
      <line key={n} x1="-0.65" y1={pos} x2="7.35" y2={pos} vectorEffect="non-scaling-stroke" />
    );
  });
  return (
    <g>
      <polygon
        points={[point(-0.65, -1.2), point(7.35, -1.2), point(7.35, 2.15), point(-0.65, 2.15)].join(
          ' ',
        )}
        fill="#3346bd"
        stroke={plane}
        strokeWidth=".8"
      />
      <g transform="matrix(51 25.5 28 -14 79 151)" stroke={plane} opacity=".64" strokeWidth=".55">
        {crossRules}
        {longRules}
      </g>
    </g>
  );
}

function Block({
  column,
  height,
  accent,
  hatch,
}: {
  column: number;
  height: number;
  accent: boolean;
  hatch: string;
}) {
  const left = point(column, 0);
  const right = point(column + width, 0);
  const far = point(column + width, 1);
  const topLeft = point(column, 0, height);
  const topRight = point(column + width, 0, height);
  const topFar = point(column + width, 1, height);
  const topBack = point(column, 1, height);
  const rightFace = [right, far, topFar, topRight].join(' ');
  return (
    <g data-height={height} stroke={ink} strokeWidth="1.65" strokeLinejoin="round">
      <polygon
        points={[left, right, topRight, topLeft].join(' ')}
        fill={accent ? apricot : '#e5e0c0'}
      />
      <polygon points={rightFace} fill={accent ? '#985967' : '#405394'} />
      <polygon points={rightFace} fill={`url(#${hatch})`} stroke="none" />
      <polygon
        points={[topLeft, topRight, topFar, topBack].join(' ')}
        fill={accent ? '#ffc8a0' : cream}
      />
      <path
        d={`M${topLeft}L${topRight}`}
        stroke={accent ? '#ffd9b3' : '#fff8df'}
        strokeWidth="1.15"
      />
    </g>
  );
}

export function SortingArtwork({
  frame,
  index,
  swaps,
}: {
  frame: PrintFrame;
  index: number;
  swaps: number;
}) {
  const id = useId();
  const hatch = `${id}-hatch`;
  const grain = `${id}-dot`;
  const title = `${id}-title`;
  const description = `${id}-desc`;
  return (
    <svg
      viewBox="0 0 540 370"
      className="block h-auto w-full"
      role="img"
      aria-labelledby={title}
      aria-describedby={description}
    >
      <title id={title}>Isometric sorting print</title>
      <desc id={description}>
        Seven columns on a drafted plane. Heights from left to right: {frame.heights.join(', ')}.
        {frame.nextPair === null
          ? ' Sorted from shortest to tallest.'
          : ' The peach columns are the next pair to swap.'}
      </desc>
      <defs>
        <pattern id={hatch} width="4" height="4" patternUnits="userSpaceOnUse">
          <path d="M-1 1L1-1 M0 4L4 0 M3 5L5 3" stroke={ink} strokeWidth="1.25" opacity=".78" />
        </pattern>
        <pattern id={grain} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r=".52" fill={cream} opacity=".39" />
        </pattern>
      </defs>
      <rect width="540" height="370" fill="#293cba" />
      <rect width="540" height="370" fill={`url(#${grain})`} />
      <g aria-hidden="true">
        <Registration x={21} y={21} />
        <Registration x={519} y={21} />
        <Registration x={21} y={349} />
        <Registration x={519} y={349} />
        <g fill={cream} fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="1.55">
          <text x="39" y="24">
            FIG. 01
          </text>
          <text x="501" y="24" textAnchor="end">
            SORTING STUDY
          </text>
          <text x="39" y="352">
            BUBBLE SORT
          </text>
          <text x="501" y="352" textAnchor="end">
            {String(index).padStart(2, '0')} / {String(swaps).padStart(2, '0')}
          </text>
        </g>
        <DrawingBoard />
        {frame.heights.map((height, column) => {
          const cast = 0.44 + height * 0.19;
          const drift = height * 0.065;
          return (
            <polygon
              key={column}
              fill={ink}
              opacity=".82"
              points={[
                point(column, 0),
                point(column + width, 0),
                point(column + width + drift, cast),
                point(column + width + drift, 1 + cast),
                point(column + drift, 1 + cast),
                point(column, 1),
              ].join(' ')}
            />
          );
        })}
        {frame.heights.map((height, column) => (
          <Block
            key={column}
            height={height}
            column={column}
            hatch={hatch}
            accent={
              frame.nextPair !== null &&
              (column === frame.nextPair || column === frame.nextPair + 1)
            }
          />
        ))}
      </g>
    </svg>
  );
}
