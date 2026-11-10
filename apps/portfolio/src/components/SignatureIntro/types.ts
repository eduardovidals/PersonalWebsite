import type { ReactNode } from 'react';

export interface SignatureIntroProps {
  /** The resting hero content that the signature settles beside. */
  children: ReactNode;
}

export interface SignatureArmProps {
  /** The homepage path of this document's language, such as `/` or `/vi/`. */
  home: string;
}
