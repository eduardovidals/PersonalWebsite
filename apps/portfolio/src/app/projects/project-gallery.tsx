'use client';

import { useState, type ReactNode } from 'react';
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import type { ProjectKind } from '@/content/projects/kind';

const options = [
  { id: 'all', label: 'All projects' },
  { id: 'career', label: 'Career' },
  { id: 'personal', label: 'Personal' },
  { id: 'business', label: 'Business' },
] as const;

interface GalleryEntry {
  id: string;
  kind: ProjectKind;
  card: ReactNode;
}

export function ProjectGallery({ entries }: { entries: readonly GalleryEntry[] }) {
  const [filter, setFilter] = useState<ProjectKind | 'all'>('all');
  const shown = filter === 'all' ? entries : entries.filter((entry) => entry.kind === filter);
  return (
    <>
      <div className="project-filter mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Select
          value={filter}
          onChange={(key) => {
            const choice = options.find((item) => item.id === key);
            if (choice) setFilter(choice.id);
          }}
          className="flex items-center gap-2.5"
        >
          <Label className="text-sm font-medium text-vidals-muted">Show</Label>
          <Button className="inline-flex min-h-11 min-w-36 items-center justify-between gap-4 rounded-full border border-vidals-border bg-vidals-surface px-4 text-sm font-semibold text-vidals-text data-hovered:border-vidals-accent">
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
          <Popover className="z-40 min-w-(--trigger-width) rounded-xl border border-vidals-border bg-vidals-deep p-1 text-vidals-text shadow-xl">
            <ListBox items={options} className="outline-none">
              {(item) => (
                <ListBoxItem
                  id={item.id}
                  textValue={item.label}
                  className="flex min-h-11 cursor-default items-center justify-between gap-3 rounded-lg px-3 text-sm outline-none data-focused:bg-vidals-poster data-focused:ring-1 data-focused:ring-inset data-focused:ring-vidals-accent data-selected:font-bold"
                >
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
          {shown.length} {shown.length === 1 ? 'project' : 'projects'}
        </span>
      </div>
      <div className="mt-8 grid items-start gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-14">
        {shown.map(({ id, card }) => (
          <div key={id} className="min-w-0">
            {card}
          </div>
        ))}
      </div>
    </>
  );
}
