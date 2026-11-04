import Link from 'next/link';
import { TypedGreeting } from './TypedGreeting';

export function PersonalIntro() {
  return (
    <section
      id="home"
      className="shell relative grid min-h-[min(78svh,46rem)] place-content-center py-24 text-center"
    >
      <TypedGreeting />
      <div className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm sm:text-base">
        <Link
          href="#projects"
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-vidals-text underline decoration-vidals-accent underline-offset-8 hover:text-vidals-accent"
        >
          See my projects <span aria-hidden="true">↓</span>
        </Link>
        <Link
          href="/blog/"
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-vidals-text underline decoration-vidals-accent underline-offset-8 hover:text-vidals-accent"
        >
          Read my blog <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
