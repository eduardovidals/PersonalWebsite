import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="shell py-28">
      <p className="font-mono text-sm text-accent">404 / Off course</p>
      <h1 className="mt-4 font-serif text-6xl">No route here.</h1>
      <p className="my-7 text-muted">
        This page may have moved. The project archive is a good place to pick up the trail.
      </p>
      <Link className="font-bold underline underline-offset-4" href="/projects/">
        Explore the work →
      </Link>
    </section>
  );
}
