// A printed tile represents a real cell. Reveal cells in BFS visit order, then
// follow the predecessor chain to reveal one of the grid's shortest routes.
const rows = [
  '............',
  '...##....##.',
  '...#......E.',
  '...#.###.##.',
  '.###.#...#..',
  '.....#.###..',
  '.S.#...#....',
  '...###...##.',
  '............',
] as const;

export type Cell = Readonly<{ x: number; y: number; key: number; wall: boolean }>;

export function buildSearchPlate(grid: readonly string[]) {
  const height = grid.length;
  const width = grid[0]?.length ?? 0;
  if (!width || grid.some((row) => row.length !== width))
    throw new Error('Expected a rectangular grid.');
  const symbols = grid.join('');
  const start = symbols.indexOf('S'),
    finish = symbols.indexOf('E');
  if (start === -1 || finish === -1) throw new Error('The grid needs a start and finish.');
  const cells: Cell[] = grid.flatMap((row, y) =>
    Array.from(row, (symbol, x) => ({
      x,
      y,
      key: y * width + x,
      wall: symbol === '#',
    })),
  );
  const queue = [start];
  const previous = new Map<number, number | null>([[start, null]]);
  const visits = new Map<number, number>();
  for (let head = 0; head < queue.length; head++) {
    const key = queue[head];
    visits.set(key, head);
    if (key === finish) break;
    const { x, y } = cells[key];
    for (const [dx, dy] of [
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, 0],
    ]) {
      const nx = x + dx,
        ny = y + dy,
        next = ny * width + nx;
      if (nx < 0 || nx >= width || ny < 0 || ny >= height || cells[next].wall || previous.has(next))
        continue;
      previous.set(next, key);
      queue.push(next);
    }
  }
  if (!visits.has(finish)) throw new Error('The finish is unreachable.');
  const route: number[] = [];
  for (let key: number | null = finish; key !== null; key = previous.get(key) ?? null)
    route.push(key);
  const path = new Map(route.reverse().map((key, i) => [key, visits.size + i]));
  // Draw from back to front so raised walls occlude the floor correctly.
  const tiles = cells
    .map((cell) => ({
      ...cell,
      visitAt: visits.get(cell.key) ?? Infinity,
      routeAt: path.get(cell.key) ?? Infinity,
    }))
    .sort((a, b) => a.x + a.y - b.x - b.y || a.x - b.x);
  return {
    cells,
    tiles,
    start,
    finish,
    width,
    height,
    visitCount: visits.size,
    endFrame: visits.size + route.length,
    steps: route.length - 1,
  };
}

export const searchPlate = buildSearchPlate(rows);
