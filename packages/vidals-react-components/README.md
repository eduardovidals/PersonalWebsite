# @vidals/react-components

Shared, provider-free React Aria controls. The main entry point ships ESM, TypeScript declarations and a preserved `'use client'` boundary. It has no Next.js, routing, delivery-service or application dependency.

```tsx
import { VidalsButton, VidalsLink, VidalsTextField } from '@vidals/react-components';
import { Form } from 'react-aria-components';

<Form onSubmit={submit} validationBehavior="aria">
  <VidalsTextField label="Your name" name="from_name" autoComplete="name" isRequired />
  <VidalsTextField label="Message" name="message" multiline rows={4} isRequired />
  <VidalsButton type="submit" isPending={sending}>
    {sending ? 'Sending…' : 'Send message'}
  </VidalsButton>
</Form>;

<VidalsLink href="/projects/" variant="primary">
  All projects
</VidalsLink>;
```

Every control is a React Aria component, so press, hover and keyboard focus behave the same with a mouse, touch and keyboard, and state styling uses the React Aria Tailwind plugin (`hover:`, `pressed:`, `focus-visible:`, `current:`, `expanded:`).

- `VidalsLink` is React Aria's `Link` with `inline`, `primary`, `secondary` and `plain` appearances. Wrap the app in React Aria's `RouterProvider` so same-site links use the app's router; without one, links navigate natively. Pass `aria-current` to mark the current page and style it with `current:`.
- `VidalsButton` and `VidalsIconButton` are actions with `primary` and `subtle` appearances. A pending button suppresses activation but keeps keyboard focus.
- `VidalsDisclosure` shows and hides one panel from a trigger button. The trigger can switch wording with a render function or with `group-expanded:` classes, and the panel height animates unless the reader prefers reduced motion.
- `VidalsTextField` always has a visible label; `description` and `errorMessage` are associated with its control. Pass `isReadOnly`, not `isDisabled`, to lock a field without dropping its value from a native form submission.
- `VidalsMobileMenu` is the phone navigation in a React Aria modal under a sticky header, and `VidalsLanguageMenu` lists a page in every available language, each item named in its own language; `onAction` reports the choice before the page changes, so an app can remember it.
- `VidalsBackToTop`, `VidalsLinkLabel`, `VidalsMenuIcon` and `VidalsPressRipple` provide the back-to-top control, growing link underline, menu glyph and press ripple.

Every visible word is a prop, so an app passes its own translations. React Aria ships screen-reader strings for 34 languages but not Vietnamese. The separate server entry `@vidals/react-components/i18n` exports `ReactAriaStrings`, which a root layout renders before hydration to give React Aria complete Vietnamese strings; a test fails when the installed React Aria adds or renames a string.

The consuming stylesheet imports Tailwind v4 and `@vidals/tailwind-theme` once and includes this workspace's `src` in `@source`. No component imports global CSS. From the repository root, run `npm run storybook` for the interactive catalog or `npm run storybook:build` for a static catalog. `npm test -w @vidals/react-components` runs unit tests and the story interaction and accessibility checks in Chromium and WebKit (build the package first when not using Nx).
