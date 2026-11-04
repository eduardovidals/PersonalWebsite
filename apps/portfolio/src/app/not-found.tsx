import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="shell py-16 text-center">
      <h1 className="text-3xl font-bold text-vidals-text sm:text-4xl">Page not found</h1>
      <p className="mt-3 mb-6 text-vidals-muted">Sorry, I couldn’t find that page.</p>
      <Link
        className="font-semibold text-vidals-accent underline underline-offset-4"
        href="/projects/"
      >
        Browse my projects
      </Link>
    </section>
  );
}
