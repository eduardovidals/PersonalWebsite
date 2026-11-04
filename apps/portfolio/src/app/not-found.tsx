import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="shell py-12 text-vidals-text sm:py-20">
      <p
        aria-hidden="true"
        className="border-b-4 border-vidals-text pb-4 text-[clamp(6rem,20vw,15rem)] leading-[.9] font-black tracking-[-.08em]"
      >
        404
      </p>
      <h1 className="mt-5 text-3xl leading-tight font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-3 mb-6 font-[Georgia,serif] text-xl italic text-vidals-muted">
        Sorry, I couldn’t find that page.
      </p>
      <Link
        className="font-semibold text-vidals-accent underline underline-offset-4"
        href="/projects/"
      >
        Browse my projects
      </Link>
    </section>
  );
}
