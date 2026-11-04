import Link from 'next/link';
import { SortingPrint } from '@/components/SortingPrint';
import { TypedGreeting } from './TypedGreeting';

export function PersonalIntro() {
  return (
    <section
      id="home"
      aria-labelledby="intro-title"
      className="shell relative isolate grid items-center gap-6 pt-9 pb-10 md:grid-cols-[.95fr_1.05fr] md:gap-6 md:py-14 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_47%,rgba(130,96,207,.12),transparent_54%)]"
        aria-hidden="true"
      />
      <div className="min-w-0">
        <TypedGreeting />
        <h1
          id="intro-title"
          className="mt-3 text-[clamp(3.4rem,6.1vw,6.2rem)] leading-[.99] font-semibold tracking-[-.04em]"
        >
          Hey, I’m <span className="block text-vidals-accent">Eduardo.</span>
        </h1>
        <p className="mt-5 max-w-[36ch] text-base leading-relaxed text-vidals-muted sm:text-xl">
          I build mobile and web apps. For fun, I turn algorithms into things you can play with.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="#projects"
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-vidals-text px-6 text-sm font-semibold text-vidals-background transition-colors hover:bg-vidals-accent"
          >
            Explore my work <span aria-hidden="true">↓</span>
          </Link>
          <Link
            href="/blog/"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-vidals-surface px-5 text-sm font-semibold text-vidals-text ring-1 ring-white/10 transition-colors hover:bg-vidals-poster"
          >
            Read my blog <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <SortingPrint />
    </section>
  );
}
