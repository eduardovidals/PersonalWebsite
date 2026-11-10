import type { Messages } from '../../types';

export const about = {
  eyebrow: 'Sobre Eduardo',
  title: 'Mi historia',
  description:
    'Eduardo Vidals habla de los equipos, las aplicaciones y los pequeños negocios que formaron su manera de pensar sobre cómo construir software.',
} as const satisfies Messages['about'];
