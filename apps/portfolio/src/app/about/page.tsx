import type { Metadata } from 'next';
import Link from 'next/link';
import { articleProse } from '@/components/article-prose';

const title = 'From design systems to Software Factory';
const description =
  'Eduardo Vidals on the teams, applications, and small businesses that shaped the way he thinks about building software.';
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about/' },
  openGraph: { title, description, url: '/about/', type: 'website', images: ['/social-card.png'] },
};

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-[48rem] px-5 py-12 sm:px-8 sm:py-16">
      <p className="mb-3 font-mono text-xs text-vidals-accent">About Eduardo</p>
      <h1 className="text-balance text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
        {title}
      </h1>
      <div className={`mt-8 ${articleProse}`}>
        <p>
          When I joined PGIM, I had a pretty strong opinion about Angular versus React. I still have
          framework preferences. What I care about more now is whether something I learn building
          one app makes life easier for the person building the next one.
        </p>
        <h2>I learned by building things I could explain</h2>
        <p>
          At New Jersey City University, I made{' '}
          <Link href="/projects/pathfinding-visualizer/">search algorithms visible</Link> so I could
          see the difference between where a search looked and the route it found. At Smarttwigs,
          building <Link href="/projects/props/">Props</Link> taught me REST by giving me a real
          problem: a mobile app needed a leaderboard, and I had to write the service behind it.
          Later, while interning at PGIM, I ran NJCU’s software development club and hosted its
          first frontend bootcamp. Teaching someone else was a pretty good way to find out which
          parts I didn’t understand yet.
        </p>
        <h2>At PGIM, other engineers became my users</h2>
        <p>
          I started by publishing Angular components and services. I thought React would make it
          easier to build interfaces, and I eventually led our department’s move to React. But React
          didn’t tell a team how a dialog should work with a keyboard, how to fetch data
          consistently, or what another app might break when a shared component changed. Those were
          the problems that drew me into design systems.
        </p>
        <p>
          The work grew into an application framework with 50+ components used across 20 internal
          apps. Teams could start a full-stack project in under five minutes. I also led delivery of
          15+ React, .NET, and SQL applications. Sometimes the right fix was nowhere near the
          screen: on one critical API endpoint, we cut response time in half.
        </p>
        <p>
          Some of the most useful things I built weren’t components. Storybook examples and
          onboarding guides helped cut ramp-up from four weeks to about one. Working with several
          teams also changed how I thought about upgrades: a fix you share can help everyone, but
          they all depend on you to keep it compatible. I proposed modernizing a broader design
          system and later worked with a colleague on a company-wide application-platform proposal.
          The platform we actually shipped was departmental.
        </p>
        <h2>What working with agents brought into focus</h2>
        <p>
          I’m a senior software engineer at Prudential Financial. My focus is the React and
          TypeScript design system: accessible components, how they behave, and how teams use them.
          I also rebuilt an application on that foundation. Much of its code had been written with
          AI. The app worked, but I had to untangle how its screens were organized and how they
          loaded data before I could make changes confidently.
        </p>
        <p>
          That experience stuck with me. An agent can produce code far faster than someone can learn
          their way around it. If the project never settled on a pattern, a longer prompt won’t give
          the next developer one. I write Claude Code skills and plugins for the same reason I write
          component examples: a convention is much more useful when it’s there at the moment someone
          needs it.
        </p>
        <h2>Why I took the idea outside work</h2>
        <p>
          On my own time I built an <Link href="/projects/#anniversary">anniversary gift</Link> and
          an <Link href="/projects/#order-entry">order-entry dashboard</Link> using the same project
          foundation. One had a 3D opening; the other had an order form and a database. The products
          didn’t need to look alike. But the same conventions helped a coding agent produce code I
          could recognize and work on in both.
        </p>
        <p>
          A conversation about what people were building with AI got me thinking about businesses
          around me: a party-rental business, a produce business, the places I shop. A rental owner
          knows what it means for an item to be booked. Why should they also have to invent a way to
          build, test, upgrade, and hand off a reservation system? I’d spent years helping engineers
          avoid that kind of repeated work. Why couldn’t a small business get that benefit too?
        </p>
        <p>
          That’s why I’m building <Link href="/projects/software-factory/">Software Factory</Link>{' '}
          independently. AI made the problem harder to ignore. The part I’m passionate about is
          making hard-won engineering knowledge useful to someone else, long after the first version
          ships.
        </p>
      </div>
    </article>
  );
}
