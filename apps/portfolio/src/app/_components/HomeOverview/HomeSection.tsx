import type { ReactNode } from 'react';

const tones = {
  plain: 'bg-vidals-background',
  tinted: 'bg-vidals-paper',
  closing: 'bg-vidals-poster',
} as const;

export function HomeSection({
  id,
  labelledBy,
  tone = 'plain',
  children,
}: Readonly<{
  id: string;
  labelledBy: string;
  tone?: keyof typeof tones;
  children: ReactNode;
}>) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`border-t border-vidals-border/35 ${tones[tone]}`}
    >
      <div className="shell py-12 sm:py-16 lg:py-20">{children}</div>
    </section>
  );
}
