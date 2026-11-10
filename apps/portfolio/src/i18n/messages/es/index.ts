import type { Messages } from '../../types';
import { about } from './about';
import { common } from './common';
import { format } from './format';
import { home } from './home';
import { projects } from './projects';
import { velton } from './velton';

/** The Spanish catalog. */
const messages = { common, home, projects, about, velton, format } satisfies Messages;

export default messages;
