const roles = ['Software Engineer.', 'Developer.', 'Programmer.'];

/** Each role owns one hold; the last transition types back into the first hold. */
function makeFrames() {
  const frames = [];
  for (const [index, role] of roles.entries()) {
    frames.push({ word: role, delay: index === 0 ? 2000 : 1400 });
    for (let n = role.length - 1; n >= 0; n--) frames.push({ word: role.slice(0, n), delay: 45 });
    const next = roles[(index + 1) % roles.length];
    for (let n = 1; n < next.length; n++) frames.push({ word: next.slice(0, n), delay: 68 });
  }
  return frames;
}

export const typingFrames = makeFrames();
