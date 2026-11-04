import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { PersonalIntro } from '@/components/PersonalIntro';
import { formatPostDate, type PostSummary } from '@/content/blog';
import { Arrow } from './components/Arrow/Arrow';
import { ProjectShelf } from './components/ProjectShelf/ProjectShelf';
import { Toolkit } from './components/Toolkit/Toolkit';

const title =
  'text-balance text-[clamp(2rem,4.8vw,3.4rem)] leading-[1.08] font-semibold tracking-[-.045em]';
const sectionLink =
  'inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-vidals-accent hover:bg-vidals-surface';

export function HomeOverview({ notes }: Readonly<{ notes: readonly PostSummary[] }>) {
  return (
    <>
      <PersonalIntro />

      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="shell pt-8 pb-14 sm:pt-12 sm:pb-20"
      >
        <div className="mb-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 sm:mb-9">
          <h2 id="projects-heading" className={title}>
            Things I’ve built
          </h2>
          <Link href="/projects/" className={sectionLink}>
            All projects <Arrow />
          </Link>
        </div>
        <ProjectShelf />
      </section>

      <section id="about" aria-labelledby="about-heading" className="shell py-12 sm:py-20">
        <div className="grid items-start gap-5 lg:grid-cols-[.8fr_1.2fr] lg:gap-12">
          <h2 id="about-heading" className={title}>
            A little about me
          </h2>
          <div className="max-w-[62ch] space-y-4 leading-relaxed text-vidals-muted sm:text-lg">
            <p>
              At NJCU, I ran our software development club’s first frontend bootcamp. Later, at
              PGIM, I helped teams move from Angular to React. We built a library of more than 50
              components that found a home in 20 apps. I spent as much time helping people use those
              components as I did writing them.
            </p>
            <p>
              I’m now a senior software engineer at Prudential Financial. One part of my job I
              particularly like: getting keyboard behavior right in a shared component, so the next
              person who uses it doesn’t have to solve it again.
            </p>
            <p>
              Software Factory is my own project. I want someone changing an app a year from now to
              know why it works the way it does, without having to track down the person who wrote
              it.
            </p>
            <p className="text-vidals-text">Away from the keyboard, I love running.</p>
          </div>
        </div>
      </section>

      <Toolkit />

      <section id="blog" aria-labelledby="journal-heading" className="shell py-12 sm:py-20">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <h2 id="journal-heading" className={title}>
            From my blog
          </h2>
          <Link href="/blog/" className={sectionLink}>
            All blog posts <Arrow />
          </Link>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 sm:gap-12">
          {notes.map((note) => (
            <article key={note.slug}>
              <Link
                href={`/blog/${note.slug}/`}
                aria-labelledby={`home-post-${note.slug}`}
                className="group block rounded-xl py-2"
              >
                <time dateTime={note.date} className="text-sm font-medium text-vidals-muted">
                  {formatPostDate(note.date)}
                </time>
                <h3
                  id={`home-post-${note.slug}`}
                  className="mt-2 flex items-baseline gap-2 text-2xl font-semibold tracking-tight group-hover:text-vidals-accent"
                >
                  {note.title}{' '}
                  <Arrow
                    direction="up-right"
                    className="self-center text-base text-vidals-accent"
                  />
                </h3>
                <p className="mt-2 max-w-[49ch] leading-relaxed text-vidals-muted">
                  {note.summary}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="shell pt-10 pb-16 sm:pt-16 sm:pb-24"
      >
        <div className="grid items-center gap-7 rounded-[2rem] bg-vidals-deep p-6 sm:p-10 md:grid-cols-[1.1fr_.9fr] md:gap-12">
          <div>
            <h2 id="contact-heading" className={title}>
              Let’s talk
            </h2>
            <p className="mt-4 max-w-[37ch] leading-relaxed text-vidals-muted sm:text-lg">
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
