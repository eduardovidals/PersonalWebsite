const roles = ['Software Engineer.', 'Developer.', 'Programmer.', 'Software Engineer.'];

/** A finite sequence: hold the whole role, erase it, type the next, then settle on the original. */
function makeFrames() {
  const frames = [{ word: roles[0], delay: 2000 }];
  for (let i = 1; i < roles.length; i++) {
    const last = roles[i - 1];
    const next = roles[i];
    for (let n = last.length - 1; n >= 0; n--) frames.push({ word: last.slice(0, n), delay: 45 });
    for (let n = 1; n <= next.length; n++)
      frames.push({ word: next.slice(0, n), delay: n === next.length ? 1400 : 68 });
  }
  return frames;
}

export const typingFrames = makeFrames();
