import { twMerge } from 'tailwind-merge';
import { toolMarks } from '@/content/tools/marks';
import { chipSizeStyles, chipStyles, listStyles, markStyles } from './styles';
import type { ToolChipsProps as Props } from './types';

/**
 * Static tool labels. The text names the tool; its mark adds no second screen-reader label.
 * @example
 * ```tsx
 * <ToolChips tools={['React', 'TypeScript']} label="Tools used on Props" compact />
 * ```
 */
export function ToolChips(props: Props) {
  const { tools, label, compact = false } = props;
  const size = compact ? chipSizeStyles.compact : chipSizeStyles.regular;

  return (
    <ul aria-label={label} className={listStyles}>
      {tools.map((name) => {
        const [icon, tint] = toolMarks[name];
        return (
          <li key={name} className={twMerge(chipStyles, size)}>
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={twMerge(markStyles, tint)}
            >
              <use href={`/tool-marks.svg#${icon}`} />
            </svg>
            {name}
          </li>
        );
      })}
    </ul>
  );
}
