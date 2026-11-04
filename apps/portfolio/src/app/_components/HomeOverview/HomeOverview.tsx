import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { PersonalIntro } from '@/components/PersonalIntro';
import { WorkVisual } from '@/components/WorkVisual';
import { formatPostDate, type PostSummary } from '@/content/blog';
import { currentWork, softwareFactory } from '@/content/projects/current-work';
import { Arrow } from './components/Arrow/Arrow';
import { CareerJourney } from './components/CareerJourney/CareerJourney';
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
        <article
          aria-labelledby="featured-factory"
          className="mb-5 grid items-center gap-6 rounded-3xl bg-vidals-deep p-5 sm:p-7 md:grid-cols-[1.1fr_1fr] md:gap-9"
        >
          <WorkVisual work={softwareFactory} />
          <div>
            <p className="text-sm font-medium text-vidals-accent">My independent project</p>
            <h3 id="featured-factory" className="mt-1 text-3xl font-semibold tracking-tight">
              {softwareFactory.title}
            </h3>
            <p className="mt-3 max-w-[49ch] leading-relaxed text-vidals-muted">
              Why should a small business have to become a software company just to own a good app?
              I’m building Factory so the owner keeps the decisions and the code, and the next
              engineer can pick up where the last one left off.
            </p>
            <Link
              href="/projects/software-factory/"
              className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-vidals-accent underline-offset-4 hover:underline"
            >
              Why I’m building Software Factory <Arrow />
            </Link>
          </div>
        </article>
        <div className="mb-4 grid gap-5 sm:grid-cols-2">
          {currentWork
            .filter(({ id }) => id === 'anniversary' || id === 'design-system')
            .map((work) => (
              <Link
                key={work.id}
                href={'/projects/#' + work.id}
                className="group grid grid-cols-[5.5rem_1fr] items-center gap-4 rounded-2xl bg-vidals-surface p-3 sm:grid-cols-[7rem_1fr]"
                aria-label={'Explore ' + work.title}
              >
                <WorkVisual work={work} compact />
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold group-hover:text-vidals-accent">
                    {work.title} <Arrow />
                  </h3>
                  <p className="mt-1 text-sm text-vidals-muted">
                    {work.id === 'anniversary'
                      ? 'An anniversary gift for my girlfriend.'
                      : 'Accessible components at Prudential.'}
                  </p>
                </div>
              </Link>
            ))}
        </div>
        <details>
          <summary className="w-fit cursor-pointer rounded-md py-3 text-sm font-semibold text-vidals-accent underline-offset-4 hover:underline">
            Browse six early projects and demos
          </summary>
          <div className="mt-5">
            <ProjectShelf />
          </div>
        </details>
      </section>

      <CareerJourney />
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
              Building something for people you know? I’d love to hear about it. Questions about my
              work and coffee chats are welcome, too.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
