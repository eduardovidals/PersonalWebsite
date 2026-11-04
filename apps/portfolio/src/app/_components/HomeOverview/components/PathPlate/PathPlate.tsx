'use client';

import { useEffect, useState } from 'react';
import { VidalsButton } from '@vidals/react-components';
import { searchPlate } from './searchPlate';

const { tiles, start, finish, width, height, visitCount, endFrame, steps } = searchPlate;
const cellSize = 20;

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
    } else if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInstantPlays((n) => n + 1);
    } else {
      setFrame(0);
    }
  }

  return (
    <figure className="my-2 max-w-sm rounded-3xl bg-vidals-surface p-5 text-vidals-text">
      <figcaption className="mb-3">
        <p className="font-semibold">Breadth-first search</p>
        <p className="mt-1 text-sm leading-relaxed text-vidals-muted">
          Watch the search spread out from A. The dots trace a shortest route to B.
        </p>
      </figcaption>
      <svg
        viewBox={`0 0 ${width * cellSize} ${height * cellSize}`}
        role="img"
        aria-labelledby="plate-title plate-desc"
        className="mx-auto block w-full max-w-72"
      >
        <title id="plate-title">Finding a path from A to B</title>
        <desc id="plate-desc">
          A two-dimensional maze. The search explores purple squares and avoids the striped walls.
          The shortest route takes {steps} steps.
        </desc>
        <defs>
          <pattern id="wall-stripes" width="5" height="5" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="#393740" />
            <path d="M0 5L5 0" stroke="#a7a3af" />
          </pattern>
        </defs>
        {tiles.map(({ key, x, y, wall, routeAt, visitAt }) => {
          const isEndpoint = key === start || key === finish;
          const onRoute = frame > routeAt;
          return (
            <g key={key} transform={`translate(${x * cellSize} ${y * cellSize})`}>
              <rect
                x="0.75"
                y="0.75"
                width="18.5"
                height="18.5"
                rx="1.5"
                fill={
                  wall
                    ? 'url(#wall-stripes)'
                    : isEndpoint || onRoute
                      ? 'var(--color-vidals-print)'
                      : frame > visitAt
                        ? '#7764a2'
                        : '#35333b'
                }
              />
              {isEndpoint ? (
                <text
                  x="10"
                  y="14"
                  textAnchor="middle"
                  fill="#19191f"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {key === start ? 'A' : 'B'}
                </text>
              ) : onRoute ? (
                <circle cx="10" cy="10" r="2.5" fill="#19191f" />
              ) : null}
            </g>
          );
        })}
      </svg>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-vidals-muted">Shortest route: {steps} steps</span>
        <VidalsButton variant="subtle" onPress={toggleTrace}>
          {playing ? 'Finish trace' : 'Replay trace'}
        </VidalsButton>
      </div>
      <span role="status" className="sr-only">
        {playing
          ? 'Searching the grid.'
          : `Search complete. Shortest route: ${steps} steps.${instantPlays ? ` Replay ${instantPlays}.` : ''}`}
      </span>
    </figure>
  );
}
