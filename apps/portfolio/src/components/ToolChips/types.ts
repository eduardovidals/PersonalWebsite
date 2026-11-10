import type { ToolName } from '@/content/tools/marks';

export interface ToolChipsProps {
  /** Tools in display order. */
  tools: readonly ToolName[];
  /** Accessible name of the list, such as "Tools used on Props". */
  label: string;
  /** Smaller chips for cards and dense lists. */
  compact?: boolean;
}
