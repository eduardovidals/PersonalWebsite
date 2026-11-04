import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { formatPostDate, type PostSummary } from '@/content/blog';
import { projects } from '@/content/projects';
import { PathPlate } from './components/PathPlate/PathPlate';
import { Arrow } from './components/Arrow/Arrow';
import { ProjectShelf } from './components/ProjectShelf/ProjectShelf';

const sectionTitle =
  'font-serif text-[clamp(2.8rem,5.6vw,4.6rem)] leading-[.98] tracking-[-.055em]';
const label =
  'font-mono text-[10px] leading-tight font-semibold uppercase tracking-[.13em] sm:text-[11px]';
const linkStyle =
  'inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline decoration-1 underline-offset-[5px] hover:text-accent';
const skills = [
  ['Languages', 'TypeScript, Python, Java, C++'],
  ['Interfaces', 'React, React Native, HTML, CSS'],
  ['Systems & graphics', 'REST APIs, Redux, Three.js'],
] as const;

function Track() {
  return (
    <svg
      aria-hidden="true"
      width="84"
      height="49"
      viewBox="0 0 84 49"
      fill="none"
      className="shrink-0"
    >
      {[0, 1, 2, 3].map((n) => (
        <rect
          key={n}
          x={2 + n * 3.5}
          y={5 + n * 3.5}
          width={80 - n * 7}
          height={39 - n * 7}
          rx={(39 - n * 7) / 2}
          stroke={n === 0 ? '#ff9268' : '#9eb5ac'}
          strokeWidth="1.15"
        />
      ))}
      <path d="M53 4v12m4-12v12" stroke="#ff9268" strokeWidth="1.8" />
    </svg>
  );
}

export function HomeOverview(props: Readonly<{ notes: readonly PostSummary[] }>) {
  return (
    <>
      <section id="home" aria-labelledby="hero-name" className="shell">
        <div className="grid items-center gap-8 pt-10 pb-10 sm:pt-14 sm:pb-14 md:grid-cols-[.87fr_1.13fr] md:gap-8 lg:grid-cols-[.92fr_1.08fr] lg:gap-16 lg:pt-[4.8rem] lg:pb-[4.8rem]">
          <div className="min-w-0">
            <p className={`${label} flex items-center gap-2.5 text-accent`}>
              <span aria-hidden="true" className="h-px w-7 bg-current" />
              Engineering portfolio
            </p>
            <h1
              id="hero-name"
              className="mt-5 font-serif text-[clamp(4.2rem,9.1vw,7.25rem)] leading-[.87] tracking-[-.069em] sm:mt-7"
            >
              Eduardo
              <br />
              <span className="italic">Vidals</span>
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-5 max-w-[25em] text-[clamp(1rem,1.49vw,1.2rem)] leading-[1.58] text-muted sm:mt-6">
              I’m a software engineer. I build interactive visualizations and web apps, and write
              about how they work.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-5 sm:mt-7">
              <Link
                href="#projects"
                className="inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-accent"
              >
                Explore my work <Arrow direction="down" />
              </Link>
              <Link href="/blog/" className={linkStyle}>
                Read the blog <Arrow />
              </Link>
            </div>
          </div>
          <PathPlate />
        </div>
      </section>

      <section id="projects" aria-labelledby="projects-heading" className="shell">
        <div className="border-t border-ink/45 pt-8 pb-14 sm:pt-10 sm:pb-20">
          <p className={`${label} flex items-center justify-between text-accent`}>
            <span>01 / Project index</span>
            <span className="text-muted">{String(projects.length).padStart(2, '0')} entries</span>
          </p>
          <div className="mt-4 mb-7 flex flex-wrap items-end justify-between gap-x-7 gap-y-2 sm:mb-9">
            <h2 id="projects-heading" className={sectionTitle}>
              Selected work<span className="text-accent">.</span>
            </h2>
            <Link href="/projects/" className={linkStyle}>
              Project archive <Arrow />
            </Link>
          </div>
          <ProjectShelf />
        </div>
      </section>

      <section id="about" aria-labelledby="about-heading" className="bg-night text-paper">
        <div className="shell py-12 sm:py-[4.5rem]">
          <p className={`${label} text-signal`}>02 / Profile</p>
          <div className="mt-5 grid gap-10 md:grid-cols-[1.15fr_.85fr] md:gap-14 lg:gap-24">
            <div>
              <h2 id="about-heading" className={sectionTitle}>
                Behind the work.
              </h2>
              <p className="mt-6 max-w-[50ch] text-base leading-[1.7] text-[#d5ded9] sm:text-[17px]">
                I started building visualizers because I wanted to see what an algorithm does
                between its input and its answer. Turning each step into something I could see
                helped me understand the code.
              </p>
              <p className="mt-3 max-w-[51ch] text-base leading-[1.7] text-[#d5ded9] sm:text-[17px]">
                I interned as a software engineer at PGIM and directed the Software Development Club
                at NJCU, where we helped students explore tools and practices for building software.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Track />
                <p className="font-serif text-xl tracking-[-.02em] italic text-paper">
                  Off the keyboard? I love running.
                </p>
              </div>
            </div>
            <div id="skills" className="self-start border-t border-[#71817f]">
              <h3 className={`${label} py-4 text-[#e4ecdf]`}>Technical skills</h3>
              <dl>
                {skills.map(([group, tools]) => (
                  <div key={group} className="border-t border-[#475b5d] py-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[.1em] text-[#b3c6bd]">
                      {group}
                    </dt>
                    <dd className="mt-2 text-lg font-medium leading-snug tracking-[-.03em]">
                      {tools}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="journal-heading" className="shell py-12 sm:py-20">
        <p className={`${label} text-accent`}>03 / Engineering notebook</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-x-7 gap-y-2">
          <h2 id="journal-heading" className={sectionTitle}>
            Field notes<span className="text-accent">.</span>
          </h2>
          <Link href="/blog/" className={linkStyle}>
            All blog posts <Arrow />
          </Link>
        </div>
        <div className="mt-6 border-y border-ink/45 sm:mt-9">
          {props.notes.map((note) => (
            <article key={note.slug} className="border-t border-line first:border-t-0">
              <Link
                href={`/blog/${note.slug}/`}
                className="group grid items-baseline gap-2 py-5 sm:grid-cols-[minmax(7rem,.27fr)_1fr_auto] sm:gap-6 sm:py-7"
              >
                <span className="font-mono text-[10px] uppercase tracking-[.08em] text-muted">
                  <time dateTime={note.date}>{formatPostDate(note.date)}</time>
                </span>
                <div className="min-w-0">
                  <h3 className="font-serif text-[clamp(1.55rem,3.25vw,2.6rem)] leading-[1.1] tracking-[-.045em] group-hover:underline decoration-1 underline-offset-[.14em]">
                    {note.title}
                  </h3>
                  <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed text-muted">
                    {note.summary}
                  </p>
                </div>
                <Arrow direction="up-right" className="hidden self-center text-2xl sm:block" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="border-t border-line bg-mist"
      >
        <div className="shell grid gap-8 py-12 sm:py-16 md:grid-cols-[.9fr_1.1fr] md:gap-12">
          <div>
            <p className={`${label} text-accent`}>04 / Contact</p>
            <h2 id="contact-heading" className={`${sectionTitle} mt-5`}>
              Let’s talk<span className="text-accent">.</span>
            </h2>
            <p className="mt-5 max-w-[34ch] text-[17px] leading-relaxed text-muted">
              Have a question about a project or a note? I’d love to hear from you.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
