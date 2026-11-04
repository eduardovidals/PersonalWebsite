const branch = [
  [1, 4],
  [1, 3],
  [1, 2],
  [2, 2],
  [3, 2],
  [4, 2],
  [3, 6],
  [4, 6],
  [5, 6],
  [6, 3],
  [6, 2],
  [5, 2],
  [8, 2],
  [8, 1],
  [9, 1],
  [10, 1],
  [10, 3],
  [11, 3],
];
const walls = [
  [3, 3],
  [3, 4],
  [4, 4],
  [5, 4],
  [7, 3],
  [7, 2],
  [9, 4],
  [9, 5],
  [10, 5],
];
const route = [
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
  [5, 5],
  [6, 5],
  [6, 4],
  [7, 4],
  [8, 4],
  [8, 3],
  [9, 3],
  [9, 2],
  [10, 2],
  [11, 2],
];

/** A still from the idea behind the archive: the search is larger than its final route. */
export function SearchFigure() {
  return (
    <figure className="mx-auto w-full max-w-[21rem] self-end">
      <svg viewBox="0 0 258 146" className="w-full text-ink" aria-hidden="true">
        <defs>
          <pattern id="field-dots" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="9" cy="9" r="1" fill="currentColor" opacity=".28" />
          </pattern>
        </defs>
        <rect width="258" height="146" fill="url(#field-dots)" />
        {walls.map(([x, y]) => (
          <rect
            key={`${x},${y}`}
            x={x * 18 + 2}
            y={y * 18 + 2}
            width="14"
            height="14"
            fill="currentColor"
            opacity=".14"
          />
        ))}
        {branch.map(([x, y]) => (
          <rect
            key={`${x},${y}`}
            x={x * 18 + 6}
            y={y * 18 + 6}
            width="6"
            height="6"
            fill="none"
            stroke="currentColor"
            opacity=".6"
          />
        ))}
        <g className="text-accent">
          <polyline
            points={route.map(([x, y]) => `${x * 18 + 9},${y * 18 + 9}`).join(' ')}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <circle cx="27" cy="99" r="5" fill="currentColor" />
          <circle cx="207" cy="45" r="7" fill="currentColor" />
          <circle cx="207" cy="45" r="3" className="fill-paper" />
        </g>
      </svg>
      <figcaption className="mt-3 flex justify-between border-t border-line pt-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted">
        <span>Fig. 01</span>
        <span>Search / route</span>
      </figcaption>
    </figure>
  );
}
