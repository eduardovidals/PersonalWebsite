export function Arrow({
  direction = 'right',
  className = '',
}: {
  direction?: 'right' | 'down' | 'up-right';
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`h-[1.1em] w-[1.1em] shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === 'up-right' ? (
        <path d="M4.5 15.5 15.5 4.5M5 4.5h10.5V15" />
      ) : direction === 'down' ? (
        <path d="M4.5 4.5l11 11M5 15.5h10.5V5" />
      ) : (
        <path d="M2.5 10h15M11 4l6.5 6-6.5 6" />
      )}
    </svg>
  );
}
