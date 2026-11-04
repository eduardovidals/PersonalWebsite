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
          I’m a senior software engineer at Prudential, where I work on our design system, DX.
          Outside work, I’m building Software Factory for small businesses.
        </p>
        <h2>Getting started at NJCU and Smarttwigs</h2>
        <p>
          At New Jersey City University, I built a{' '}
          <Link href="/projects/pathfinding-visualizer/">pathfinding visualizer</Link> so I could
          see where an algorithm looked before it found a route. At Smarttwigs, I learned REST by
          writing the service behind the leaderboard in <Link href="/projects/props/">Props</Link>,
          a mobile app. Later, while interning at PGIM, I ran NJCU’s software development club and
          hosted its first frontend bootcamp. Teaching someone else was a pretty good way to find
          out which parts I didn’t understand yet.
        </p>
        <h2>Building PInnacle at PGIM</h2>
        <p>
          As an intern, I wrote Angular components and services for PGIM’s internal apps. Later I
          led our department’s move to React. One thing I liked about working on a shared library
          was that we could fix keyboard navigation in a dialog once instead of asking each team to
          fix its own. That’s what got me interested in design systems.
        </p>
        <p>
          PInnacle’s library grew to 50+ components across 20 internal apps. Teams could start a
          full-stack project in under five minutes. I also led delivery of 15+ applications built
          with React, .NET, and SQL. On one critical API endpoint, we cut the response time in half.
        </p>
        <p>
          I wrote Storybook examples and onboarding guides that helped new engineers get up to speed
          in about a week instead of four. With several teams using the library, we had to make sure
          a fix for one app wouldn’t break another. PInnacle served our department. I also proposed
          modernizing a broader design system and later worked with a colleague on a proposal for a
          company-wide application platform.
        </p>
        <h2>DX and PEAQ at Prudential</h2>
        <p>
          On DX, I work on accessible React and TypeScript components and write examples that show
          engineers how to use them. I also refactored PEAQ, an existing internal app that brokers
          use for structured settlements and Income Advantage.
        </p>
        <p>
          Working on PEAQ meant editing AI-assisted code. Its screens loaded data in different ways,
          so knowing how one screen worked didn’t help much with the next. I refactored how the
          screens were organized and how they loaded data so they’d be easier to change.
        </p>
        <p>
          I also write skills and plugins for Claude Code to help it follow our conventions when it
          makes changes to the library.
        </p>
        <h2>What I build outside work</h2>
        <p>
          <Link href="/projects/#anniversary">YniBirthday</Link> was an anniversary gift for my
          girlfriend. I wanted her to open a little 3D world, not another slideshow. My{' '}
          <Link href="/projects/#order-entry">order-entry dashboard</Link> needed almost the
          opposite: a form that got out of the way and a server that wouldn’t accept an invalid
          order.
        </p>
        <p>
          I organized the code for both projects the same way: I kept components with the features
          that used them, put shared controls in one place, and tested what someone could actually
          do in the app. I did the same with my market-data dashboard and this portfolio, even
          though the dashboards use Vite and this site uses Next.js.
        </p>
        <p>
          A conversation about what people were building with AI got me thinking about businesses
          around me: a party-rental business, a produce business, the places I shop. A rental owner
          knows what it means for an item to be booked. They shouldn’t also have to figure out how
          to build and test a reservation system, keep it up to date, or hand it off to someone
          else.
        </p>
        <p>
          That’s why I’m building <Link href="/projects/software-factory/">Software Factory</Link>{' '}
          independently. At PGIM, our teams could start with a working project instead of setting
          everything up themselves. I’d like a small business to have that option too, with software
          they can keep using and changing after the first version ships.
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
