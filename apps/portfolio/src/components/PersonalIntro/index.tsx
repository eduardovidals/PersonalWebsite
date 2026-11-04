import Link from 'next/link';
import { SortingPrint } from '@/components/SortingPrint';
import { TypedGreeting } from './TypedGreeting';

export function PersonalIntro() {
  return (
    <section
      id="home"
      aria-labelledby="intro-title"
      className="shell grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-[0.93fr_1.07fr] lg:gap-14 lg:py-14"
    >
      <div className="min-w-0">
        <p className="mb-5 flex items-center gap-2.5 font-mono text-xs font-semibold tracking-widest uppercase">
          <span aria-hidden="true" className="h-2 w-2 bg-vidals-print" /> Personal portfolio
        </p>
        <h1
          id="intro-title"
          className="text-[clamp(4.3rem,8.25vw,7.8rem)] leading-[.82] font-bold tracking-[-.05em]"
        >
          Eduardo{' '}
          <span className="block font-editorial font-normal text-vidals-print italic">Vidals.</span>
        </h1>
        <TypedGreeting />
        <p className="mt-3 max-w-[41ch] text-base leading-relaxed sm:text-lg">
          I’ve built mobile checkout flows and a sorting visualizer you can walk through. Here are
          the projects, and the notes I took along the way.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href="#projects"
            className="inline-flex min-h-11 items-center gap-4 bg-vidals-text px-5 font-semibold text-vidals-paper hover:bg-vidals-print"
          >
            Selected work <span aria-hidden="true">↓</span>
          </Link>
          <Link
            href="/blog/"
            className="inline-flex min-h-11 items-center gap-2 font-semibold underline decoration-vidals-border underline-offset-4 hover:text-vidals-accent"
          >
            Read the blog <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <SortingPrint />
    </section>
  );
}
