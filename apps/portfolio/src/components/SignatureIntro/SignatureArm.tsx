import { armSignature } from './armSignature';
import type { SignatureArmProps as Props } from './types';

/**
 * Arms the homepage intro before the first paint. Render it near the start of `<body>`; the
 * matching first-frame styles live in `globals.css`, and `beginSignatureFlight` disarms it.
 * @example
 * ```tsx
 * <SignatureArm home="/es/" />
 * ```
 */
export function SignatureArm(props: Props) {
  const { home } = props;
  const script = `(${armSignature.toString()})(${JSON.stringify(home)});`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
