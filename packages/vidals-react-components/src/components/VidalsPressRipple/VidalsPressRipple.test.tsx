import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { VidalsButton } from '../VidalsButton/index.js';
import { VidalsPressRipple } from './VidalsPressRipple.js';

describe('VidalsPressRipple', () => {
  it('adds decorative ink to pressed React Aria targets and ignores everything else', () => {
    render(
      <>
        <VidalsPressRipple />
        <VidalsButton data-ripple="">Ripples</VidalsButton>
        <VidalsButton>Plain</VidalsButton>
      </>,
    );
    const target = screen.getByRole('button', { name: 'Ripples' });
    fireEvent.pointerDown(target, { button: 0, clientX: 5, clientY: 5 });
    const ink = target.querySelector('.press-ripple');
    expect(ink).toHaveAttribute('aria-hidden', 'true');
    fireEvent.keyDown(target, { key: 'Enter' });
    expect(target.querySelectorAll('.press-ripple')).toHaveLength(2);
    const plain = screen.getByRole('button', { name: 'Plain' });
    fireEvent.pointerDown(plain, { button: 0 });
    expect(plain.querySelector('.press-ripple')).toBeNull();
  });
});
