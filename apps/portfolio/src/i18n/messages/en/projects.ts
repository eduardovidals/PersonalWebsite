export const projects = {
  page: {
    title: 'Projects',
    description:
      'Design systems at Prudential, PInnacle at PGIM, and Eduardo’s independent projects.',
    intro: 'My work at Prudential and PGIM, my company Velton, and things I build for fun',
    home: 'Home',
    filterLabel: 'Show',
    filters: { all: 'All Projects', career: 'Career', personal: 'Personal', business: 'Business' },
    notes: 'Tools and Development Notes',
  },
  detail: {
    allProjects: 'All projects',
    breadcrumb: 'Breadcrumb',
    details: 'Project details',
    context: 'Context',
    builtWith: 'Built With',
    caseStudy: 'Case study',
    moreProjects: 'More projects',
    viewFullSize: 'View Full Size:',
    desktopScreenshot: 'Desktop Screenshot',
    phoneScreenshot: 'Phone Screenshot',
    originalScreenshot: 'Original Screenshot',
    fullScreenshot: 'Full Screenshot',
    fullSize: 'Full Size',
    codeSample: 'Scrollable code sample',
    downloadRecording: 'Download the recording',
  },
  aiKinds: {
    productFeature: 'Product Feature',
    developerTooling: 'Developer Tooling',
    developmentAssistant: 'Development Assistant',
  },
  items: {
    props: {
      title: 'Props',
      category: 'Product Engineering',
      context: 'Smarttwigs Internship',
      caption: 'Mobile screens, subscription checkout, and the API behind the leaderboard',
      description:
        'I learned REST by building a leaderboard people could actually use, alongside mobile screens and subscription checkout',
      coverAlt: 'Archived Props account setup, from registration to choosing a subscription plan.',
      signupAlt: 'The Props app’s sign-up screen.',
      subscriptionAlt: 'The Props app’s subscription screen.',
    },
    benev: {
      title: 'Benev',
      category: 'Product Engineering',
      context: 'Smarttwigs Internship',
      caption: 'A membership carousel connected to Stripe checkout',
      description:
        'I built the carousel for choosing a membership plan and connected the choice to Stripe checkout',
      coverAlt:
        'Benev’s welcome screen, with an illustrated sidebar and a choice of account types.',
    },
    'sorting-visualizer': {
      title: 'Sorting Visualizer',
      category: 'Algorithm Visualization',
      context: 'AlgoVisual',
      caption: 'Three sorting algorithms animated one step at a time',
      description:
        'Three algorithms can finish with the same sorted list, so I animated the steps to show the different work each one does',
      coverAlt: 'Light-blue bars rearranging during merge sort in AlgoVisual.',
    },
    'pathfinding-visualizer': {
      title: 'Pathfinding Visualizer',
      category: 'Algorithm Visualization',
      context: 'AlgoVisual',
      caption: 'Different search algorithms finding their way through the same maze',
      description:
        'Watch where a search looks before it finds a route, then switch algorithms and see what changes',
      coverAlt: 'A* search tracing a route through a generated maze in AlgoVisual.',
    },
    '3d-sorting-visualizer': {
      title: '3D Sorting Visualizer',
      category: 'Computer Graphics',
      context: 'NJCU Coursework',
      caption: 'A sorting animation you can walk through in 3D',
      description:
        'For a computer graphics class, I took my sorting bars off the page and made a scene you could walk through while they moved',
      coverAlt: 'Merge sort rearranging upright bars in a 3D scene.',
    },
    'solar-system': {
      title: 'Solar System',
      category: 'Computer Graphics',
      context: 'NJCU Coursework',
      caption: 'A 3D model of planetary rotation and orbits',
      description:
        'I used planets to learn how motion fits together in 3D, with each planet spinning on its axis as it circles the sun',
      coverAlt: 'Textured Sun and planets on orbital paths against a starfield.',
    },
  },
  work: {
    'software-factory': {
      title: 'Velton',
      description: 'My company, building custom software that small businesses fully own',
      alt: 'The Velton homepage: “Software built around your business” beside Owen, its discovery guide.',
      caption: 'Velton Homepage in Development',
      notes: {
        productFeature:
          'Owen helps define the change, and Iris edits and tests an isolated draft for human review',
        developerTooling: 'I package the repository’s engineering skills for Claude Code and Codex',
      },
    },
    'pgim-platform': {
      title: 'PInnacle',
      description:
        'I led PGIM’s internal app platform from Angular to React, with 50+ shared components across 20 apps',
      alt: 'The PGIM logo.',
      caption: 'Built at PGIM',
      notes: {},
    },
    'design-system': {
      title: 'Prudential Design System',
      description: 'The shared buttons, forms, and menus that Prudential’s apps are built with',
      alt: 'The Prudential.com homepage, built with Prudential’s design system components.',
      caption: 'Prudential.com Homepage',
      notes: {
        developerTooling:
          'I write plugins and skills that help AI-assisted changes follow the library’s conventions',
      },
    },
    'market-data': {
      title: 'Market Data Dashboard',
      description: 'Charts for comparing stock prices, built for a Pharo interview',
      alt: 'A performance chart comparing the price histories of three sample instruments.',
      caption: 'Pharo Interview Project',
      notes: {
        developmentAssistant:
          'I used Codex for implementation, tests, review, and documentation, and the dashboard itself never calls a model',
      },
    },
    'order-entry': {
      title: 'Order Entry Dashboard',
      description:
        'A trading order form with instant price checks, built for a Schonfeld interview',
      alt: 'The order-entry dashboard showing sample trading activity.',
      caption: 'Schonfeld Interview Project',
      notes: {},
    },
    anniversary: {
      title: 'Yni Anniversary',
      description: 'A 3D gift box my girlfriend opens to relive our first year together',
      alt: 'A pink 3D gift box tied with a burgundy bow, surrounded by flowers and floating hearts.',
      caption: 'The Gift’s 3D Opening Scene',
      notes: {},
    },
    portfolio: {
      title: 'This Portfolio',
      description: 'The site you’re on, with my work, writing, and career in one place',
      alt: 'My blue portfolio homepage with its handwritten EV monogram and personal introduction.',
      caption: 'This Site’s Homepage',
      notes: {
        developmentAssistant:
          'I use Claude Code and Codex to help implement and test the site, and reading a page never triggers an AI request',
      },
    },
  },
} as const;
