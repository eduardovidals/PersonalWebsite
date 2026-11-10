import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VidalsLink } from '../VidalsLink/index.js';
import { VidalsLinkLabel } from './VidalsLinkLabel.js';

describe('VidalsLinkLabel', () => {
  it('keeps the link name intact and applies the growing underline', () => {
    render(
      <VidalsLink href="/about/" variant="plain">
        <VidalsLinkLabel className="extra">About me</VidalsLinkLabel>{' '}
        <span aria-hidden="true">→</span>
      </VidalsLink>,
    );
    const label = screen.getByText('About me');
    expect(label).toHaveClass('link-grow', 'extra');
    expect(screen.getByRole('link', { name: 'About me' })).toBeInTheDocument();
  });
});
