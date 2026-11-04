export interface SortingFrame {
  readonly heights: readonly number[];
  /** Left-hand index of the next inverted pair; null in the final state. */
  readonly nextPair: number | null;
}

function recordSwaps(input: ReadonlyArray<number>): readonly SortingFrame[] {
  const heights = [...input];
  const frames: SortingFrame[] = [];
  // Record only swaps, not comparisons. Each press therefore changes the illustration.
  for (let end = heights.length - 1; end > 0; end--) {
    let changed = false;
    for (let i = 0; i < end; i++) {
      if (heights[i] <= heights[i + 1]) continue;
      frames.push({ heights: [...heights], nextPair: i });
      [heights[i], heights[i + 1]] = [heights[i + 1], heights[i]];
      changed = true;
    }
    if (!changed) break;
  }
  return [...frames, { heights, nextPair: null }];
}

export const frames = recordSwaps([3, 6, 2, 7, 4, 1, 5]);
