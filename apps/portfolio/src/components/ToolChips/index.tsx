import { toolMarks, type ToolName } from '@/content/tools/marks';

interface ToolChipsProps {
  tools: readonly ToolName[];
  label: string;
  compact?: boolean;
}

/** Static tool labels. The text names the tool; its icon adds no second screen-reader label. */
export function ToolChips({ tools, label, compact = false }: Readonly<ToolChipsProps>) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {tools.map((name) => {
        const [icon, tint] = toolMarks[name];
        return (
          <li
            key={name}
            className={`inline-flex max-w-full items-center gap-2 rounded-full bg-vidals-surface font-medium text-vidals-text ring-1 ring-inset ring-vidals-border/25 ${compact ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2 text-sm'}`}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`size-4 shrink-0 ${tint}`}
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
