import Image from 'next/image';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { PersonalIntro } from '@/components/PersonalIntro';
import { formatPostDate, type PostSummary } from '@/content/blog';
import { Arrow } from './components/Arrow/Arrow';
import { ProjectShelf } from './components/ProjectShelf/ProjectShelf';
import cppLogo from './skills/cpp.webp';
import cssLogo from './skills/css.webp';
import htmlLogo from './skills/html.webp';
import javaLogo from './skills/java.webp';
import pythonLogo from './skills/python.webp';
import reactLogo from './skills/react.webp';
import apiLogo from './skills/swagger.webp';
import typeScriptLogo from './skills/typescript.webp';

const sectionTitle =
  'text-3xl font-bold tracking-tight text-vidals-text sm:text-[2.5rem] sm:leading-tight';
const linkStyle =
  'inline-flex min-h-11 items-center gap-2 font-medium text-vidals-accent underline decoration-vidals-accent/60 underline-offset-4 hover:decoration-vidals-accent';
const skills = [
  ['Java', javaLogo],
  ['C++', cppLogo],
  ['HTML', htmlLogo],
  ['CSS', cssLogo],
  ['React', reactLogo],
  ['TypeScript', typeScriptLogo],
  ['Python', pythonLogo],
  ['REST APIs', apiLogo],
] as const;

export function HomeOverview({ notes }: Readonly<{ notes: readonly PostSummary[] }>) {
  return (
    <>
      <PersonalIntro />

      <section
        id="about"
        aria-labelledby="about-heading"
        className="bg-vidals-deep text-vidals-text"
      >
        <div className="shell py-20 text-center sm:py-28">
          <h2 id="about-heading" className={sectionTitle}>
            About me
          </h2>
          <div className="mx-auto mt-6 max-w-[62ch] space-y-4 text-base leading-relaxed sm:text-lg">
            <p>
              I interned as a software engineer at PGIM and led the Software Development Club at
              NJCU, where we helped students get hands-on with new technologies.
            </p>
            <p>
              After taking Princeton’s algorithms courses, I wanted to see what Merge Sort does
              between its first step and its last. I built a sorting visualizer in React, then tried
              my hand at pathfinding.
            </p>
            <p className="pt-1 font-medium text-vidals-accent">P.S. I also love running!</p>
          </div>
        </div>
      </section>

      <section id="skills" aria-labelledby="skills-heading" className="shell py-20 sm:py-24">
        <h2 id="skills-heading" className={`${sectionTitle} text-center`}>
          Technical skills
        </h2>
        <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-4 sm:gap-y-10">
          {skills.map(([name, logo]) => (
            <li key={name} className="flex flex-col items-center gap-3 font-medium">
              <Image src={logo} alt="" className="h-14 w-14 object-contain sm:h-16 sm:w-16" />
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="bg-vidals-deep text-vidals-text"
      >
        <div className="shell py-16 sm:py-24">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-x-5 gap-y-1 sm:mb-9">
            <h2 id="projects-heading" className={sectionTitle}>
              Projects
            </h2>
            <Link href="/projects/" className={linkStyle}>
              All projects <Arrow />
            </Link>
          </div>
          <ProjectShelf />
        </div>
      </section>

      <section id="blog" aria-labelledby="journal-heading" className="shell py-16 sm:py-24">
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1">
          <h2 id="journal-heading" className={sectionTitle}>
            Blog
          </h2>
          <Link href="/blog/" className={linkStyle}>
            All blog posts <Arrow />
          </Link>
        </div>
        <div className="mt-5 divide-y divide-vidals-border border-y border-vidals-border sm:mt-8">
          {notes.map((note) => (
            <article
              key={note.slug}
              className="grid items-baseline gap-2 py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8"
            >
              <time dateTime={note.date} className="text-sm text-vidals-muted">
                {formatPostDate(note.date)}
              </time>
              <div>
                <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  <Link
                    href={`/blog/${note.slug}/`}
                    className="decoration-vidals-accent underline-offset-4 hover:text-vidals-accent hover:underline"
                  >
                    {note.title}
                  </Link>
                </h3>
                <p className="mt-2 max-w-prose leading-relaxed text-vidals-muted">{note.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="bg-vidals-deep text-vidals-text"
      >
        <div className="shell grid items-start gap-8 py-16 sm:py-24 md:grid-cols-2 md:gap-14">
          <div>
            <h2 id="contact-heading" className={sectionTitle}>
              Let’s talk
            </h2>
            <p className="mt-4 max-w-[36ch] leading-relaxed text-vidals-muted sm:text-lg">
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
