import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { PersonalIntro } from '@/components/PersonalIntro';
import { ToolChips } from '@/components/ToolChips';
import { formatPostDate, type PostSummary } from '@/content/blog';
import { softwareFactory } from '@/content/projects/current-work';
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
      <CareerJourney />

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
          className="mb-8 grid items-center gap-5 rounded-3xl bg-vidals-deep p-6 sm:mb-10 sm:p-8 md:grid-cols-[1fr_1.35fr] md:gap-10"
        >
          <div>
            <p className="text-sm font-medium text-vidals-accent">My independent project</p>
            <h3 id="featured-factory" className="mt-1 text-3xl font-semibold tracking-tight">
              {softwareFactory.title}
            </h3>
            <Link
              href="/projects/software-factory/"
              className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-vidals-accent underline-offset-4 hover:underline"
            >
              Why I’m building Software Factory <Arrow />
            </Link>
          </div>
          <div className="min-w-0 space-y-4">
            <p className="max-w-[58ch] leading-relaxed text-vidals-muted">
              A small business shouldn’t need its own platform team to own good software. And a team
              that already knows how to build it shouldn’t have to start over on every app. I’m
              building Factory for both: reuse what engineers have learned, keep the business’s
              decisions with the code, and make the software easier to change years from now.
            </p>
            <ToolChips
              label={`Tools used on ${softwareFactory.title}`}
              tools={softwareFactory.stack}
              compact
            />
          </div>
        </article>
        <ProjectShelf />
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
              What do you wish the last person who worked on your app had left you? I’d love to
              trade stories. Coffee chats and questions about my projects are welcome, too.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
