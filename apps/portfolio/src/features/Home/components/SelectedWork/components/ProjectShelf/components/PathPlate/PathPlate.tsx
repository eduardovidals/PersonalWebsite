'use client';

import { VidalsButton } from '@vidals/react-components';
import { useEffect, useState } from 'react';
import { searchPlate } from './searchPlate';
import type { PathPlateProps as Props } from './types';

const { tiles, start, finish, width, height, visitCount, endFrame } = searchPlate;
const cellSize = 20;

/**
 * A small breadth-first search that replays on demand, finishing at once with reduced motion.
 * @example
 * ```tsx
 * <PathPlate labels={labels} />
 * ```
 */
export function PathPlate(props: Props) {
  const { labels } = props;
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
        <p className="font-semibold">{labels.algorithm}</p>
        <p className="mt-1 text-sm leading-relaxed text-vidals-muted">{labels.legend}</p>
      </figcaption>
      <svg
        viewBox={`0 0 ${width * cellSize} ${height * cellSize}`}
        role="img"
        aria-labelledby="plate-title plate-desc"
        className="mx-auto block w-full max-w-72"
      >
        <title id="plate-title">{labels.title}</title>
        <desc id="plate-desc">{labels.description}</desc>
        <defs>
          <pattern id="wall-stripes" width="5" height="5" patternUnits="userSpaceOnUse">
            <rect width="5" height="5" fill="var(--color-vidals-deep)" />
            <path d="M0 5L5 0" stroke="var(--color-vidals-muted)" />
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
                        ? 'var(--color-vidals-border)'
                        : 'var(--color-vidals-poster)'
                }
              />
              {isEndpoint ? (
                <text
                  x="10"
                  y="14"
                  textAnchor="middle"
                  fill="var(--color-vidals-background)"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {key === start ? 'A' : 'B'}
                </text>
              ) : onRoute ? (
                <circle cx="10" cy="10" r="2.5" fill="var(--color-vidals-background)" />
              ) : null}
            </g>
          );
        })}
      </svg>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm text-vidals-muted">{labels.shortestRoute}</span>
        <VidalsButton variant="subtle" onPress={toggleTrace}>
          {playing ? labels.finish : labels.replay}
        </VidalsButton>
      </div>
      <span role="status" className="sr-only">
        {playing
          ? labels.searching
          : instantPlays
            ? `${labels.complete} ${labels.replayNumber.replace('{{count}}', String(instantPlays))}`
            : labels.complete}
      </span>
    </figure>
  );
}
