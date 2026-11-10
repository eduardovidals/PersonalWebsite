'use client';

import { useState } from 'react';
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import { filterBarStyles, gridStyles, optionStyles, popoverStyles, triggerStyles } from './styles';
import type { GalleryFilter, ProjectGalleryProps as Props } from './types';

/**
 * Every project in one grid with a React Aria filter by kind. The count announces itself when the
 * filter changes; without JavaScript every card shows.
 * @example
 * ```tsx
 * <ProjectGallery entries={entries} filterLabel="Show" options={options} counts={counts} />
 * ```
 */
export function ProjectGallery(props: Props) {
  const { entries, filterLabel, options, counts } = props;
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const shown = filter === 'all' ? entries : entries.filter((entry) => entry.kind === filter);

  return (
    <>
      <div className={filterBarStyles}>
        <Select
          value={filter}
          onChange={(key) => {
            const choice = options.find((item) => item.id === key);
            if (choice) setFilter(choice.id);
          }}
          className="flex items-center gap-2.5"
        >
          <Label className="text-sm font-medium text-vidals-muted">{filterLabel}</Label>
          <Button data-ripple="" className={triggerStyles}>
            <SelectValue />
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="m4 6 4 4 4-4" />
            </svg>
          </Button>
          <Popover className={popoverStyles}>
            <ListBox items={options} className="outline-none">
              {(item) => (
                <ListBoxItem id={item.id} textValue={item.label} className={optionStyles}>
                  {({ isSelected }) => (
                    <>
                      {item.label}
                      {isSelected && <span aria-hidden="true">✓</span>}
                    </>
                  )}
                </ListBoxItem>
              )}
            </ListBox>
          </Popover>
        </Select>
        <span role="status" className="text-sm text-vidals-muted">
          {counts[filter]}
        </span>
      </div>
      <div className={gridStyles}>
        {shown.map(({ id, card }) => (
          <div key={id} className="min-w-0">
            {card}
          </div>
        ))}
      </div>
    </>
  );
}
