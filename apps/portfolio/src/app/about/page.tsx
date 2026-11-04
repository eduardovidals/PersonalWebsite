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
          At Prudential I work on DX, a design system. A few years ago at PGIM, I thought the
          interesting question was Angular or React. It took building a platform, teaching other
          engineers, and refactoring a working app to find the question I care about more: what does
          one project leave the next?
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
          That platform was PInnacle. Its library grew to 50+ components used across 20 internal
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
          As a senior software engineer at Prudential, I work on DX: accessible React and TypeScript
          components, their behavior, and the examples teams learn from. PEAQ gave that work a
          practical test. It’s an internal broker application for structured settlements and Income
          Advantage. I refactored it; I didn’t build it from scratch.
        </p>
        <p>
          PEAQ already worked. What made it hard to change was how its screens were organized and
          how they loaded data. Refactoring AI-assisted code brought an old lesson into focus:
          generating another screen is cheap compared with asking the next person to figure out why
          every screen does the same job differently.
        </p>
        <p>
          I write Claude Code skills and plugins for the same reason I write component examples: I
          want the convention there when someone needs it, not buried in a document they had to know
          to look for.
        </p>
        <h2>Why I took the idea outside work</h2>
        <p>
          <Link href="/projects/#anniversary">YniBirthday</Link> was an anniversary gift for my
          girlfriend. I wanted her to open a little 3D world, not another slideshow. My{' '}
          <Link href="/projects/#order-entry">order-entry dashboard</Link> needed almost the
          opposite: a form that got out of the way and a server that wouldn’t accept an invalid
          order.
        </p>
        <p>
          Underneath, they started to look familiar. I kept components with the features that own
          them, gave shared controls one home, and tested what a person could actually do. I carried
          those rules into my market-data dashboard and this portfolio, too. This site uses Next.js;
          the dashboards use Vite. The conventions travel. The products don’t have to look alike.
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
        <h2 id="whats-next">What’s next</h2>
        <p>
          First I want Factory’s local platform ready for someone else to use, and a marketing site
          that explains it without a tour from me. I also want to make a movie blog for myself and
          build software for my girlfriend’s own business.
        </p>
        <p>
          The first business owners I hope to build with are my friends Nicole and Glenn. Nicole
          runs a party-rental business; Glenn works in produce. A reservation and a produce sale
          aren’t the same problem. I want to learn what each of them needs, then see which parts of
          the engineering can serve them both.
        </p>
      </div>
    </article>
  );
}
