import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ReactAriaStrings } from './ReactAriaStrings.js';
import { getReactAriaStringsScript } from './script.js';

describe('ReactAriaStrings', () => {
  it('renders React Aria’s global string script for Vietnamese with the nonce', () => {
    const script = getReactAriaStringsScript('vi-vn');

    expect(script).toMatch(
      /^window\[Symbol\.for\('react-aria\.i18n\.locale'\)\]="vi-VN";\{.*window\[Symbol\.for\('react-aria\.i18n\.strings'\)\]=\{.*\};\}$/s,
    );
    expect(script).not.toContain('<');
    expect(renderToStaticMarkup(<ReactAriaStrings locale="vi-vn" nonce="abc" />)).toBe(
      `<script nonce="abc">${script}</script>`,
    );
  });

  it('renders nothing for languages React Aria ships or tags it cannot parse', () => {
    for (const locale of ['en', 'es-US', 'ar', 'not a locale', '']) {
      expect(renderToStaticMarkup(<ReactAriaStrings locale={locale} />), locale).toBe('');
    }
  });
});
