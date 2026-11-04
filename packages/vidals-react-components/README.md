# @vidals/react-components

Shared, provider-free React Aria controls. The public entry point ships ESM, TypeScript declarations and a preserved `'use client'` boundary. It has no Next.js, routing, delivery-service or application dependency.

```tsx
import { VidalsButton, VidalsTextField } from '@vidals/react-components';

<form onSubmit={submit}>
  <VidalsTextField
    label="Your name"
    name="from_name"
    autoComplete="name"
    isReadOnly={sending}
    isRequired
  />
  <VidalsTextField
    label="Message"
    name="message"
    multiline
    rows={4}
    isReadOnly={sending}
    isRequired
  />
  <VidalsButton type="submit" isPending={sending}>
    {sending ? 'Sending…' : 'Send message'}
  </VidalsButton>
</form>;
```

Buttons support React Aria press events, state render props, refs and accessible names, with `primary` and `subtle` appearances. A pending button suppresses activation but retains keyboard focus. A field always has a visible label; `description` and `errorMessage` are associated with its control. Pass `isReadOnly`, not `isDisabled`, to lock a field without dropping its value from a native form submission.

The consuming stylesheet imports Tailwind v4 and `@vidals/tailwind-theme` once and includes this workspace's `src` in `@source`. No component imports global CSS. From the repository root, run `npm run storybook` for the interactive catalog or `npm run storybook:build` for a static catalog. `npm test -w @vidals/react-components` runs unit tests and Chromium story interactions/accessibility checks (build the package first when not using Nx).
