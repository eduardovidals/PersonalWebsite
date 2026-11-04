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
    <figure aria-label="Playable sorting print" className="m-0 w-full">
      <SortingArtwork frame={frame} index={index} swaps={last} />
      <figcaption className={railStyles}>
        <Link className={caseStyles} href="/projects/3d-sorting-visualizer/">
          Sorting, in three dimensions <span aria-hidden="true">↗</span>
        </Link>
        {interactive && (
          <VidalsButton
            variant="subtle"
            className={actionStyles}
            onPress={() => setIndex((current) => (current === last ? 0 : current + 1))}
          >
            {finished ? 'Reset print' : 'Next swap'}{' '}
            <span aria-hidden="true">{finished ? '↺' : '→'}</span>
          </VidalsButton>
        )}
        <span role="status" className="sr-only">
          {finished ? 'Sorted.' : index === 0 ? 'Ready.' : `Swap ${index} of ${last}.`} Column
          order: {frame.heights.join(', ')}.
        </span>
      </figcaption>
    </figure>
  );
}
