import type { Messages } from '../../types';

export const common = {
  metadata: {
    title: 'Eduardo Vidals | Ingeniero de software sénior',
    titleTemplate: '%s | Eduardo Vidals',
    siteName: 'Eduardo Vidals',
    description:
      'Eduardo Vidals es ingeniero de software sénior en Prudential y trabaja en sistemas de diseño y productos que escalan. También fundó Velton.',
  },
  skipToContent: 'Saltar al contenido',
  homeLink: 'Eduardo Vidals, inicio',
  nav: { label: 'Principal', work: 'Trabajo', about: 'Sobre mí', contact: 'Contacto' },
  menu: {
    open: 'Abrir menú',
    close: 'Cerrar menú',
    dialog: 'Navegación del sitio',
    navigation: 'Móvil',
  },
  language: 'Idioma',
  footer: { label: 'Pie de página', name: 'Eduardo Vidals', title: 'Ingeniero de software sénior' },
  backToTop: 'Volver arriba',
  notFound: {
    title: 'Página no encontrada',
    body: 'Lo siento, no encontré esa página',
    link: 'Todos los proyectos',
  },
} as const satisfies Messages['common'];
