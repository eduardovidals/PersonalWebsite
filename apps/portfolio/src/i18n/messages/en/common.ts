export const common = {
  metadata: {
    title: 'Eduardo Vidals | Senior Software Engineer',
    titleTemplate: '%s | Eduardo Vidals',
    /** The author and site name in link previews. */
    siteName: 'Eduardo Vidals',
    description:
      'Eduardo Vidals is a Senior Software Engineer at Prudential working on design systems and products that scale. He also founded Velton.',
  },
  skipToContent: 'Skip to content',
  homeLink: 'Eduardo Vidals, home',
  nav: { label: 'Primary', work: 'Work', about: 'About', contact: 'Contact' },
  menu: {
    open: 'Open menu',
    close: 'Close menu',
    dialog: 'Site navigation',
    navigation: 'Mobile',
  },
  language: 'Language',
  footer: { label: 'Footer', name: 'Eduardo Vidals', title: 'Senior Software Engineer' },
  backToTop: 'Back to top',
  notFound: {
    title: 'Page Not Found',
    body: 'Sorry, I couldn’t find that page',
    link: 'All projects',
  },
} as const;
