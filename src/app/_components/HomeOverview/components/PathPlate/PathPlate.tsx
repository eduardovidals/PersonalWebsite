'use client';

import { useEffect, useState } from 'react';

import { searchPlate, type Cell } from './searchPlate';

const { cells, tiles, start, finish, width, height, visitCount, endFrame, steps } = searchPlate;
const px = (x: number, y: number) => 246 + (x - y) * 20.2;
const py = (x: number, y: number) => 43 + (x + y) * 10.2;
const point = (x: number, y: number, height = 0) =>
  `${px(x, y).toFixed(2)},${(py(x, y) - height).toFixed(2)}`;
const diamond = (x: number, y: number, h = 0) =>
  [point(x, y, h), point(x + 1, y, h), point(x + 1, y + 1, h), point(x, y + 1, h)].join(' ');

function Pin({ cell, name }: { cell: Cell; name: string }) {
  const x = px(cell.x + 0.5, cell.y + 0.5),
    y = py(cell.x + 0.5, cell.y + 0.5);
  return (
    <g>
      <circle cx={x} cy={y} r="3.3" fill="#17292e" stroke="#ff9d61" strokeWidth="1.4" />
      <path d={`M${x} ${y - 3}v-43`} stroke="#efebd8" strokeWidth="1.5" />
      <path d={`M${x} ${y - 48}h22l-4 7 4 7h-22z`} fill={name === 'A' ? '#f4eedc' : '#ff995b'} />
      <text
        x={x + 7}
        y={y - 37.5}
        fill="#192c30"
        fontFamily="monospace"
        fontSize="10"
        fontWeight="bold"
      >
        {name}
      </text>
    </g>
  );
}

export function PathPlate() {
  const [frame, setFrame] = useState(endFrame);
  const [instantPlays, setInstantPlays] = useState(0);
  const playing = frame < endFrame;
  useEffect(() => {
    if (!playing) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finishIfReduced = () => {
      if (reduced.matches) setFrame(endFrame);
    };
    reduced.addEventListener('change', finishIfReduced);
    const id = window.setInterval(() => {
      setFrame((n) => Math.min(endFrame, n + (n < visitCount ? 2 : 1)));
    }, 42);
    return () => {
      window.clearInterval(id);
      reduced.removeEventListener('change', finishIfReduced);
    };
  }, [playing]);
  function toggleTrace() {
    if (playing) {
      setFrame(endFrame);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInstantPlays((n) => n + 1);
    } else setFrame(0);
  }
  return (
    <figure className="relative min-w-0 overflow-hidden bg-night text-paper">
      <div className="flex items-center justify-between gap-2 px-4 pt-4 font-mono text-[9px] leading-none tracking-[.115em] sm:px-6 sm:pt-5 sm:text-[10px]">
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 border border-signal bg-signal"
          />
          ALGORITHM PLATE 001
        </span>
        <span className="text-[#a4b6b4]">FIG. A—B</span>
      </div>
      <svg
        viewBox="0 0 542 306"
        role="img"
        aria-labelledby="plate-title plate-desc"
        className="block w-full"
      >
        <title id="plate-title">Finding a path from A to B</title>
        <desc id="plate-desc">
          An isometric grid with raised mint-colored walls. A breadth-first search finds a shortest
          path of {steps} steps between two flags. Searched cells are teal and the route is orange.
        </desc>
        <defs>
          <pattern id="plate-dots" width="13" height="13" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".7" fill="#728481" opacity=".37" />
          </pattern>
          <pattern id="plate-hatch" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M0 5L5 0" stroke="#8da19b" strokeWidth=".65" opacity=".23" />
          </pattern>
        </defs>
        <rect y="12" width="542" height="290" fill="url(#plate-dots)" />
        <g fill="none" stroke="#78908e" strokeWidth=".75" opacity=".8">
          <path d="M18 30v8m-4-4h8m502-4v8m-4-4h8M18 278v8m-4-4h8m502-4v8m-4-4h8" />
        </g>
        {/* Rhomboid plinth and the two engraved elevation faces. */}
        <polygon
          points={[
            point(0, 0, -12),
            point(width, 0, -12),
            point(width, height, -12),
            point(0, height, -12),
          ].join(' ')}
          fill="#132429"
        />
        <polygon
          points={[
            point(0, height),
            point(width, height),
            point(width, height, -11),
            point(0, height, -11),
          ].join(' ')}
          fill="#54706f"
          stroke="#14292c"
        />
        <polygon
          points={[
            point(width, 0),
            point(width, height),
            point(width, height, -11),
            point(width, 0, -11),
          ].join(' ')}
          fill="#314c50"
          stroke="#14292c"
        />
        {tiles.map(({ x, y, key, wall, routeAt, visitAt }) => {
          const onPath = frame > routeAt;
          const explored = frame > visitAt;
          if (!wall)
            return (
              <g key={key}>
                <polygon
                  points={diamond(x, y)}
                  fill={onPath ? '#fb9456' : explored ? '#477778' : '#2b454b'}
                  stroke="#1b373b"
                  strokeWidth="1.05"
                />
                {onPath ? (
                  <circle
                    cx={px(x + 0.5, y + 0.5)}
                    cy={py(x + 0.5, y + 0.5)}
                    r="1.65"
                    fill="#8e472e"
                  />
                ) : explored ? (
                  <path
                    d={`M${point(x + 0.24, y + 0.48)}l5.4 2.7`}
                    stroke="#6f9b98"
                    strokeWidth="1"
                  />
                ) : null}
              </g>
            );
          const h = 14;
          return (
            <g key={key} stroke="#233d40" strokeWidth="1.05" strokeLinejoin="round">
              <polygon
                points={[
                  point(x, y + 1, h),
                  point(x + 1, y + 1, h),
                  point(x + 1, y + 1),
                  point(x, y + 1),
                ].join(' ')}
                fill="#7b9791"
              />
              <polygon
                points={[
                  point(x + 1, y, h),
                  point(x + 1, y + 1, h),
                  point(x + 1, y + 1),
                  point(x + 1, y),
                ].join(' ')}
                fill="#536e6e"
              />
              <polygon points={diamond(x, y, h)} fill="#c8d7c6" />
              <polygon points={diamond(x, y, h)} fill="url(#plate-hatch)" stroke="none" />
            </g>
          );
        })}
        <Pin cell={cells[start]} name="A" />
        <Pin cell={cells[finish]} name="B" />
        <g transform="translate(467 263)" fill="none" stroke="#9bb0aa" strokeWidth="1">
          <path d="M0 12V-6m0 18 17-8M0 12l-17-8" />
          <path d="m-2-2 2-3 2 3" />
        </g>
      </svg>
      <figcaption className="mx-4 flex items-center justify-between gap-3 border-t border-[#496063] py-3.5 sm:mx-6 sm:py-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-[-.025em] sm:text-base">
            Breadth-first search
          </p>
          <p className="mt-0.5 font-mono text-[9px] tracking-[.025em] text-[#b5c5be] sm:text-[10px]">
            {width} × {height} grid · {steps} steps
          </p>
        </div>
        <button
          type="button"
          onClick={toggleTrace}
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-[#859b97] px-3 font-mono text-[10px] hover:border-[#ff995b] hover:text-[#ffad79] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffad79] sm:px-4 sm:text-[11px]"
        >
          {playing ? (
            <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10">
              <path d="M2 1h6v8H2z" fill="currentColor" />
            </svg>
          ) : (
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
              <path
                d="M2.3 5A3.8 3.8 0 1 1 3 8.5M2.2 1.9v3.3h3.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
              />
            </svg>
          )}
          {playing ? 'Finish trace' : 'Replay trace'}
        </button>
        <span role="status" className="sr-only">
          {playing
            ? 'Searching the grid.'
            : `Search complete. Shortest route: ${steps} steps.${instantPlays ? ` Replay ${instantPlays}.` : ''}`}
        </span>
      </figcaption>
    </figure>
  );
}
