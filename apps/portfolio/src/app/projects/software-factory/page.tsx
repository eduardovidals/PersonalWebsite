import type { Metadata } from 'next';
import Link from 'next/link';
import { articleProse } from '@/components/article-prose';
import { ToolChips } from '@/components/ToolChips';
import { softwareFactory } from '@/content/projects/current-work';

const description =
  'An independent software-construction platform built around reusable engineering knowledge, informed business decisions, and software its owners can keep changing.';
export const metadata: Metadata = {
  title: 'Software Factory',
  description,
  alternates: { canonical: '/projects/software-factory/' },
  openGraph: {
    title: 'Software Factory',
    description,
    url: '/projects/software-factory/',
    type: 'article',
    images: ['/social-card.png'],
  },
};

export default function SoftwareFactoryPage() {
  return (
    <article className="mx-auto w-full max-w-[48rem] px-5 py-12 sm:px-8 sm:py-16">
      <Link
        href="/projects/"
        className="inline-flex min-h-11 items-center text-sm font-medium text-vidals-accent underline-offset-4 hover:underline"
      >
        ← Projects
      </Link>
      <p className="mt-5 mb-3 font-mono text-xs text-vidals-accent">
        Independent project · Local MVP
      </p>
      <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Software Factory</h1>
      <div className={`mt-7 ${articleProse}`}>
        <p>
          A business should be able to own good software without first becoming a software company.
          And if it already has a great engineering team, that team’s best work shouldn’t get
          stranded in the last app it shipped. I’m building Software Factory to make that knowledge
          something people can use again.
        </p>
        <h2>What happens after the first build?</h2>
        <p>
          Say a rental business changes its cancellation policy. The owner knows whether it should
          apply to bookings that already exist. An engineer knows that changing the form alone won’t
          change what the database or payment integration does. Neither should have to guess what
          the other decided six months ago.
        </p>
        <p>
          I want Factory to connect that business rule to the decision behind it, the code, the
          tests, and the version the owner actually tried and approved. When the policy changes
          again, the next person should be able to see what needs to change and what has to keep
          working. That matters just as much if a human writes every line.
        </p>
        <h2>Reuse the engineering, not somebody else’s business</h2>
        <p>
          A booking policy belongs to the business. The knowledge of how to run a safe database
          migration can serve many businesses. I’m building around that distinction. Teams should be
          able to keep their own standards private, put them into working components, tools, and
          checks, and improve them across projects. An upgrade should respect the changes people
          have made since day one, not stamp a fresh template over them. And a business with a
          working app should be able to start with what it has, without agreeing to a rewrite.
        </p>
        <p>
          Owners need to know what a change will do, what it will cost, and what decision is theirs.
          Developers need ordinary source they can inspect and change. An agent needs a bounded job
          and feedback it can act on. I want people to stay because Factory is useful, not because
          they can’t take their software to another engineer.
        </p>
        <h2>What I’m building now</h2>
        <p>
          In the local version, I can describe a change in the console, settle what it should do,
          and follow that decision into the source. I can inspect the diff, see what the tests
          found, and try a working preview. Approving the code and choosing to release it are two
          different decisions. The next time I open the project, their history is still there.
        </p>
        <p>
          The part I care most about is what happens when I’m no longer the engineer in the room. I
          want the next person to be able to explain why the software works this way, decide what’s
          worth keeping, and change the rest. That’s the standard I’m building toward.
        </p>
      </div>
      <div className="mt-8">
        <ToolChips label="Tools used on Software Factory" tools={softwareFactory.stack} compact />
      </div>
      <Link
        className="mt-8 inline-flex min-h-11 items-center font-medium text-vidals-accent underline underline-offset-4"
        href="/about/"
      >
        How design systems led me here →
      </Link>
    </article>
  );
}
