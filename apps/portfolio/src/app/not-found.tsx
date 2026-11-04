import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="shell py-20 text-center text-vidals-text sm:py-28">
      <p
        aria-hidden="true"
        className="inline-block rounded-full bg-vidals-surface px-4 py-1.5 text-sm font-semibold text-vidals-accent"
      >
        404
      </p>
      <h1 className="mt-4 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-3 mb-6 text-lg text-vidals-muted">Sorry, I couldn’t find that page.</p>
      <Link
        className="font-semibold text-vidals-accent underline underline-offset-4"
        href="/projects/"
      >
        Browse my projects
      </Link>
    </section>
  );
}
