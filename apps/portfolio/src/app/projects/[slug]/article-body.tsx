import Image from 'next/image';
import Link from 'next/link';
import Markdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { imagePath, mediaDimensions } from '@/content/projects';

const recordings: Record<string, { poster: string; width: number; height: number }> = {
  'benev-signup-flow': { poster: 'benev-home', width: 1100, height: 592 },
  '3d-sorting-visualizer': { poster: 'previews/3d-sorting-visualizer', width: 1100, height: 594 },
  'solar-system': { poster: 'previews/solar-system', width: 1100, height: 592 },
};

const components: Components = {
  p({ node, children }) {
    const isGallery = node?.children.some(
      (child) => child.type === 'element' && child.tagName === 'img',
    );
    // Media always occupies a separate Markdown paragraph. Keep phone screens side by side.
    return isGallery ? (
      <div className="my-7 flex flex-wrap items-start justify-center gap-4 sm:my-9 sm:gap-6">
        {children}
      </div>
    ) : (
      <p className="my-5 first:mt-0">{children}</p>
    );
  },
  h2({ children }) {
    return (
      <h2 className="mt-10 mb-3 text-2xl leading-tight font-semibold tracking-tight text-vidals-text">
        {children}
      </h2>
    );
  },
  a({ href, children }) {
    const className = 'text-vidals-accent underline underline-offset-4 hover:decoration-2';
    return href?.startsWith('/') ? (
      <Link href={href} className={className}>
        {children}
      </Link>
    ) : (
      <a href={href} className={className}>
        {children}
      </a>
    );
  },
  ul({ children }) {
    return <ul className="my-5 list-disc space-y-2 pl-6 marker:text-vidals-accent">{children}</ul>;
  },
  pre({ children }) {
    return (
      <pre
        tabIndex={0}
        aria-label="Scrollable code sample"
        className="my-6 overflow-x-auto rounded-xl bg-vidals-surface p-4 font-mono text-sm leading-relaxed text-vidals-text sm:p-5"
      >
        {children}
      </pre>
    );
  },
  img({ src, alt = '' }) {
    if (typeof src !== 'string' || !src.startsWith('/work/')) return null;
    const name = src.slice('/work/'.length).replace(/\.[\w]+$/, '');
    if (src.endsWith('.mp4')) {
      const recording = recordings[name];
      return (
        <figure className="w-full">
          <video
            aria-label={alt}
            controls
            playsInline
            preload="none"
            poster={imagePath(recording.poster)}
            width={recording.width}
            height={recording.height}
            style={{ aspectRatio: `${recording.width}/${recording.height}` }}
            className="h-auto w-full rounded-xl bg-vidals-surface object-cover"
          >
            <source src={src} type="video/mp4" />
            <a href={src}>Download the recording</a>
          </video>
          <figcaption className="mt-2 text-sm text-vidals-muted">{alt}</figcaption>
        </figure>
      );
    }
    const [width, height] = mediaDimensions[name];
    return (
      <figure
        className={
          height > width
            ? 'relative w-[calc(50%_-_0.75rem)] max-w-56 only:w-3/4'
            : 'relative w-full'
        }
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          className="h-auto w-full rounded-xl"
        />
        <figcaption className="mt-1 text-sm leading-normal text-vidals-muted">
          <a
            href={src}
            aria-label={`${alt} — view full size`}
            className="inline-flex min-h-11 flex-wrap items-center gap-x-2 py-1 after:absolute after:inset-0 after:rounded-xl hover:text-vidals-accent"
          >
            {alt}
            <span className="text-vidals-accent underline underline-offset-4">Full size</span>
          </a>
        </figcaption>
      </figure>
    );
  },
};

export function ArticleBody({ markdown }: { markdown: string }) {
  return (
    <div className="min-w-0 wrap-anywhere text-base leading-7 text-vidals-text sm:text-lg sm:leading-8">
      <Markdown components={components}>{markdown}</Markdown>
    </div>
  );
}
