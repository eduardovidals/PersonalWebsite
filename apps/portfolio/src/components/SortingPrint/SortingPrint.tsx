'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { VidalsButton } from '@vidals/react-components';
import { frames } from './sequence';
import { SortingArtwork } from './SortingArtwork';
import { actionStyles, caseStyles, railStyles } from './styles';

const subscribe = () => () => {};
const hydrated = () => true;
const prerendered = () => false;
const last = frames.length - 1;

export function SortingPrint() {
  const [index, setIndex] = useState(0);
  const interactive = useSyncExternalStore(subscribe, hydrated, prerendered);
  const frame = frames[index];
  const finished = index === last;
  return (
    <figure aria-label="Sorting playground" className="m-0 w-full">
      <SortingArtwork frame={frame} />
      <p aria-hidden="true" className="mb-2 text-center text-sm font-medium text-vidals-muted">
        Sorting playground <span className="mx-1 text-vidals-border">/</span> {index} of {last}{' '}
        swaps
      </p>
      <figcaption className={railStyles}>
        {interactive && (
          <VidalsButton
            variant="subtle"
            className={actionStyles}
            onPress={() => setIndex((current) => (current === last ? 0 : current + 1))}
          >
            {finished ? 'Replay sort' : 'Next swap'}{' '}
            <span aria-hidden="true">{finished ? '↺' : '→'}</span>
          </VidalsButton>
        )}
        <Link className={caseStyles} href="/projects/3d-sorting-visualizer/">
          View case study <span aria-hidden="true">↗</span>
        </Link>
        <span role="status" className="sr-only">
          {finished ? 'Sorted.' : index === 0 ? 'Ready.' : `Swap ${index} of ${last}.`} Stack order:{' '}
          {frame.heights.join(', ')}.
        </span>
      </figcaption>
    </figure>
  );
}
