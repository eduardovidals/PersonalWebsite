/** One step of the typing animation: the visible text and how long it stays. */
export interface TypingFrame {
  word: string;
  delay: number;
}

/** Each role owns one hold; the last transition types back into the first hold. Slices by
 * characters, not UTF-16 units, so accented and non-Latin roles type cleanly. */
export function makeFrames(roles: readonly string[]): TypingFrame[] {
  const frames: TypingFrame[] = [];
  const letters = roles.map((role) => Array.from(role));
  for (const [index, role] of letters.entries()) {
    frames.push({ word: role.join(''), delay: index === 0 ? 2000 : 1400 });
    for (let n = role.length - 1; n >= 0; n--) {
      frames.push({ word: role.slice(0, n).join(''), delay: 45 });
    }
    const next = letters[(index + 1) % letters.length] ?? [];
    for (let n = 1; n < next.length; n++)
      frames.push({ word: next.slice(0, n).join(''), delay: 68 });
  }
  return frames;
}
