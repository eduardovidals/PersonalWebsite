import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { PersonalIntro } from '@/components/PersonalIntro';
import { formatPostDate, type PostSummary } from '@/content/blog';
import { Arrow } from './components/Arrow/Arrow';
import { ProjectShelf } from './components/ProjectShelf/ProjectShelf';

const headline = 'text-[clamp(2.8rem,7.8vw,6rem)] leading-[.94] font-black tracking-[-.05em]';
const linkStyle =
  'inline-flex min-h-11 items-center gap-2 text-sm font-bold text-vidals-accent underline decoration-1 underline-offset-[5px] hover:decoration-2';
const smallLabel = 'text-xs font-bold uppercase tracking-[.12em]';

export function HomeOverview({ notes }: Readonly<{ notes: readonly PostSummary[] }>) {
  return (
    <>
      <PersonalIntro />

      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="shell pt-6 pb-12 sm:pt-9 sm:pb-20"
      >
        <div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t-[3px] border-vidals-text pt-5 sm:mb-10">
          <h2 id="projects-heading" className={headline}>
            Selected work<span className="text-vidals-print">.</span>
          </h2>
          <Link href="/projects/" className={linkStyle}>
            All projects <Arrow />
          </Link>
        </div>
        <ProjectShelf />
      </section>

      <section id="about" aria-labelledby="about-heading" className="bg-vidals-poster">
        <div className="shell grid items-start gap-y-8 py-14 md:grid-cols-[.86fr_1.14fr] md:gap-x-12 md:py-20">
          <h2 id="about-heading" className={headline}>
            About me<span className="text-vidals-print">.</span>
          </h2>
          <div className="max-w-[59ch] space-y-4 text-base leading-relaxed sm:text-lg">
            <p>
              I interned as a software engineer at PGIM and led the Software Development Club at
              NJCU, where we helped students get hands-on with new technologies.
            </p>
            <p>
              After taking Princeton’s algorithms courses, I wanted to see what Merge Sort does
              between its first step and its last. I built a sorting visualizer in React, then tried
              my hand at pathfinding.
            </p>
            <p className="pt-1 font-serif text-[1.35rem] italic">P.S. I also love running!</p>
          </div>
          <section
            id="skills"
            aria-labelledby="skills-heading"
            className="mt-2 grid gap-x-12 gap-y-3 border-t border-vidals-text/55 pt-5 md:col-span-2 md:grid-cols-[.86fr_1.14fr]"
          >
            <h3 id="skills-heading" className={smallLabel}>
              Technical skills
            </h3>
            <ul aria-label="Technologies" className="flex max-w-prose flex-wrap gap-x-3 gap-y-1">
              {['Java', 'C++', 'HTML', 'CSS', 'React', 'TypeScript', 'Python', 'REST APIs'].map(
                (name, i) => (
                  <li key={name} className="inline-flex items-baseline gap-3 font-semibold">
                    {i > 0 && (
                      <span aria-hidden="true" className="text-vidals-accent">
                        /
                      </span>
                    )}
                    {name}
                  </li>
                ),
              )}
            </ul>
          </section>
        </div>
      </section>

      <section id="blog" aria-labelledby="journal-heading" className="shell py-16 sm:py-24">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h2 id="journal-heading" className={headline}>
            Writing<span className="text-vidals-print">.</span>
          </h2>
          <Link href="/blog/" className={linkStyle}>
            All blog posts <Arrow />
          </Link>
        </div>
        <div className="divide-y divide-vidals-text/45 border-y border-vidals-text">
          {notes.map((note) => (
            <article key={note.slug}>
              <Link
                href={`/blog/${note.slug}/`}
                aria-labelledby={`home-post-${note.slug}`}
                className="group grid gap-x-7 gap-y-2 py-6 sm:grid-cols-[8.5rem_1fr_auto] sm:items-baseline sm:py-8"
              >
                <time dateTime={note.date} className="text-sm font-medium text-vidals-muted">
                  {formatPostDate(note.date)}
                </time>
                <div>
                  <h3
                    id={`home-post-${note.slug}`}
                    className="font-serif text-[clamp(1.65rem,3.7vw,3rem)] leading-tight tracking-[-.045em] group-hover:underline decoration-1 underline-offset-4"
                  >
                    {note.title}
                  </h3>
                  <p className="mt-2 max-w-prose leading-relaxed text-vidals-muted">
                    {note.summary}
                  </p>
                </div>
                <Arrow
                  direction="up-right"
                  className="hidden self-center text-2xl text-vidals-accent sm:block"
                />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="shell pb-16 sm:pb-24">
        <div className="grid items-start gap-8 border-t-[3px] border-vidals-text pt-7 md:grid-cols-[1.1fr_.9fr] md:gap-14">
          <div>
            <h2 id="contact-heading" className={headline}>
              Let’s talk<span className="text-vidals-print">.</span>
            </h2>
            <p className="mt-5 max-w-[38ch] leading-relaxed sm:text-lg">
              Want to have a coffee chat or ask me a question about a project? I’d love to hear from
              you.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
