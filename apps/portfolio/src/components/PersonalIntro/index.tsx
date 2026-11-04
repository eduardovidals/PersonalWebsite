import Link from 'next/link';
import { SignatureIntro } from '@/components/SignatureIntro';
import { TypedGreeting } from './TypedGreeting';

export function PersonalIntro() {
  return (
    <section
      id="home"
      aria-labelledby="intro-title"
      className="shell relative grid items-center gap-10 pt-9 pb-10 md:grid-cols-[1.1fr_.9fr] md:gap-14 md:py-14 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute end-0 bottom-0 h-1/2 w-full rounded-full bg-radial from-vidals-accent/10 via-vidals-poster/20 to-transparent to-70% md:inset-y-0 md:h-full md:w-1/2"
      />
      <div className="relative min-w-0">
        <TypedGreeting />
        <h1
          id="intro-title"
          className="mt-3 text-[clamp(3.4rem,6.1vw,6.2rem)] leading-[.99] font-semibold tracking-[-.04em]"
        >
          Hey, I’m <span className="block text-vidals-accent">Eduardo.</span>
        </h1>
        <p className="mt-5 text-pretty text-lg font-medium sm:text-2xl">
          I’m a full-stack engineer at Prudential. I work on DX, our design system.
        </p>
        <p className="mt-2 max-w-[48ch] text-pretty text-base leading-relaxed text-vidals-muted sm:text-lg">
          I love that a keyboard fix in one component can make several apps easier to use. That idea
          led me to start Software Factory: I want small businesses to benefit from what engineers
          have already learned, without having to start from scratch.
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
      <SignatureIntro>
        <div className="mx-auto w-fit max-w-full py-4">
          <p className="mb-5 flex items-center gap-3 font-mono text-xs text-vidals-accent">
            <span aria-hidden="true" className="h-px w-8 bg-current" /> These days
          </p>
          <dl className="space-y-5">
            <div>
              <dt className="text-sm text-vidals-muted">At Prudential</dt>
              <dd className="mt-1 text-2xl font-medium tracking-tight text-vidals-text sm:text-3xl">
                <Link
                  href="/projects/#design-system"
                  className="rounded-sm underline-offset-4 hover:text-vidals-accent hover:underline"
                >
                  DX design system
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-vidals-muted">On my own time</dt>
              <dd className="mt-1 text-2xl font-medium tracking-tight text-vidals-text sm:text-3xl">
                <Link
                  href="/projects/software-factory/"
                  className="rounded-sm underline-offset-4 hover:text-vidals-accent hover:underline"
                >
                  Software Factory
                </Link>
              </dd>
            </div>
          </dl>
          <Link
            href="#about"
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-vidals-accent underline-offset-4 hover:underline"
          >
            How I got here <span aria-hidden="true">↓</span>
          </Link>
        </div>
      </SignatureIntro>
    </section>
  );
}
