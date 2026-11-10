import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VidalsMenuIcon } from './VidalsMenuIcon.js';

describe('VidalsMenuIcon', () => {
  it('is decorative and moves the outer bars into an X only when open', () => {
    const { container, rerender } = render(<VidalsMenuIcon isOpen={false} />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).not.toHaveAttribute('data-open');
    expect(svg.querySelectorAll('path')).toHaveLength(3);
    rerender(<VidalsMenuIcon isOpen />);
    const [top, middle, bottom] = svg.querySelectorAll('path');
    expect(svg).toHaveAttribute('data-open');
    expect(top).toHaveClass('rotate-45');
    expect(middle).toHaveClass('opacity-0');
    expect(bottom).toHaveClass('-rotate-45');
  });
});
