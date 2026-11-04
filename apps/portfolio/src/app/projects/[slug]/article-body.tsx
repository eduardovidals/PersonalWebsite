import Image from 'next/image';
import Link from 'next/link';
import Markdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { imagePath, mediaDimensions } from '@/content/projects';

const posters: Record<string, string> = {
  'benev-signup-flow': 'benev-home',
  '3d-sorting-visualizer': '3d-sorting-visualizer',
  'solar-system': 'solar-system',
};

const components: Components = {
  p({ node, children }) {
    const isGallery = node?.children.some(
      (child) => child.type === 'element' && child.tagName === 'img',
    );
    // Media always occupies a separate Markdown paragraph. Keep phone screens side by side.
    return isGallery ? (
      <div className="my-8 flex flex-wrap items-start justify-center gap-3 sm:gap-5">
        {children}
      </div>
    ) : (
      <p className="my-5 first:mt-0">{children}</p>
    );
  },
  h2({ children }) {
    return (
      <h2 className="mt-9 mb-3 text-3xl leading-tight font-bold tracking-tight text-vidals-text">
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
        className="my-6 overflow-x-auto border-s-2 border-vidals-accent bg-vidals-surface p-4 font-mono text-sm leading-relaxed text-vidals-text sm:p-5"
      >
        {children}
      </pre>
    );
  },
  img({ src, alt = '' }) {
    if (typeof src !== 'string' || !src.startsWith('/work/')) return null;
    const name = src.slice('/work/'.length).replace(/\.[\w]+$/, '');
    const caption = (
      <figcaption className="mt-2 border-t border-vidals-border pt-2 font-[Georgia,serif] text-sm leading-normal italic text-vidals-muted">
        {alt}
      </figcaption>
    );
    if (src.endsWith('.mp4')) {
      return (
        <figure className="w-full">
          <video
            aria-label={alt}
            controls
            playsInline
            preload="none"
            poster={imagePath(posters[name])}
            className="aspect-video w-full bg-vidals-surface object-contain"
          >
            <source src={src} type="video/mp4" />
            <a href={src}>Download the recording</a>
          </video>
          {caption}
        </figure>
      );
    }
    const [width, height] = mediaDimensions[name];
    return (
      <figure className={height > width ? 'w-[min(46%,14rem)]' : 'w-full'}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          unoptimized
          className="h-auto w-full border border-vidals-border"
        />
        {caption}
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
