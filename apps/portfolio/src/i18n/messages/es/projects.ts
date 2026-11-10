import type { Messages } from '../../types';

export const projects = {
  page: {
    title: 'Proyectos',
    description:
      'Sistemas de diseño en Prudential, PInnacle en PGIM y los proyectos independientes de Eduardo.',
    intro: 'Mi trabajo en Prudential y PGIM, mi empresa Velton y cosas que construyo por diversión',
    home: 'Inicio',
    filterLabel: 'Mostrar',
    filters: {
      all: 'Todos los proyectos',
      career: 'Carrera',
      personal: 'Personales',
      business: 'Negocio',
    },
    notes: 'Herramientas y notas de desarrollo',
  },
  detail: {
    allProjects: 'Todos los proyectos',
    breadcrumb: 'Ruta de navegación',
    details: 'Detalles del proyecto',
    context: 'Contexto',
    builtWith: 'Hecho con',
    caseStudy: 'Caso de estudio',
    moreProjects: 'Más proyectos',
    viewFullSize: 'Ver en tamaño completo:',
    desktopScreenshot: 'Captura de escritorio',
    phoneScreenshot: 'Captura de teléfono',
    originalScreenshot: 'Captura original',
    fullScreenshot: 'Captura completa',
    fullSize: 'Tamaño completo',
    codeSample: 'Ejemplo de código desplazable',
    downloadRecording: 'Descargar la grabación',
  },
  aiKinds: {
    productFeature: 'Función del producto',
    developerTooling: 'Herramientas para desarrolladores',
    developmentAssistant: 'Asistente de desarrollo',
  },
  items: {
    props: {
      title: 'Props',
      category: 'Ingeniería de producto',
      context: 'Pasantía en Smarttwigs',
      caption:
        'Pantallas móviles, pago de suscripciones y la API detrás de la tabla de clasificación',
      description:
        'Aprendí REST construyendo una tabla de clasificación que la gente realmente podía usar, junto con pantallas móviles y el pago de suscripciones',
      coverAlt:
        'Captura archivada de la configuración de cuenta en Props, desde el registro hasta elegir un plan de suscripción.',
      signupAlt: 'La pantalla de registro de la app Props.',
      subscriptionAlt: 'La pantalla de suscripción de la app Props.',
    },
    benev: {
      title: 'Benev',
      category: 'Ingeniería de producto',
      context: 'Pasantía en Smarttwigs',
      caption: 'Un carrusel de membresías conectado al pago con Stripe',
      description:
        'Construí el carrusel para elegir un plan de membresía y conecté esa elección al pago con Stripe',
      coverAlt:
        'La pantalla de bienvenida de Benev, con una barra lateral ilustrada y una selección de tipos de cuenta.',
    },
    'sorting-visualizer': {
      title: 'Visualizador de ordenamiento',
      category: 'Visualización de algoritmos',
      context: 'AlgoVisual',
      caption: 'Tres algoritmos de ordenamiento animados paso a paso',
      description:
        'Tres algoritmos pueden terminar con la misma lista ordenada, así que animé los pasos para mostrar el trabajo distinto que hace cada uno',
      coverAlt: 'Barras de color azul claro que se reordenan durante un merge sort en AlgoVisual.',
    },
    'pathfinding-visualizer': {
      title: 'Visualizador de búsqueda de rutas',
      category: 'Visualización de algoritmos',
      context: 'AlgoVisual',
      caption: 'Distintos algoritmos de búsqueda abriéndose paso por el mismo laberinto',
      description:
        'Observa por dónde busca un algoritmo antes de encontrar una ruta; luego cambia de algoritmo y ve qué es distinto',
      coverAlt: 'Una búsqueda A* trazando una ruta por un laberinto generado en AlgoVisual.',
    },
    '3d-sorting-visualizer': {
      title: 'Visualizador de ordenamiento en 3D',
      category: 'Computación gráfica',
      context: 'Curso en NJCU',
      caption: 'Una animación de ordenamiento que puedes recorrer en 3D',
      description:
        'Para una clase de computación gráfica, saqué mis barras de ordenamiento de la página y creé una escena que podías recorrer mientras se movían',
      coverAlt: 'Un merge sort reordenando barras verticales en una escena 3D.',
    },
    'solar-system': {
      title: 'Sistema Solar',
      category: 'Computación gráfica',
      context: 'Curso en NJCU',
      caption: 'Un modelo en 3D de la rotación y las órbitas de los planetas',
      description:
        'Usé los planetas para aprender cómo se combina el movimiento en 3D, con cada planeta girando sobre su eje mientras da vueltas alrededor del sol',
      coverAlt: 'El Sol y los planetas con texturas en sus órbitas sobre un fondo de estrellas.',
    },
  },
  work: {
    'software-factory': {
      title: 'Velton',
      description:
        'Mi empresa, que crea software a la medida que los pequeños negocios poseen por completo',
      alt: 'La página de inicio de Velton: “Software construido alrededor de tu negocio”, junto a Owen, su guía de descubrimiento.',
      caption: 'Página de inicio de Velton en desarrollo',
      notes: {
        productFeature:
          'Owen ayuda a definir el cambio, e Iris edita y prueba un borrador aislado para que una persona lo revise',
        developerTooling:
          'Empaqueto las skills de ingeniería del repositorio para Claude Code y Codex',
      },
    },
    'pgim-platform': {
      title: 'PInnacle',
      description:
        'Dirigí la migración de la plataforma de apps internas de PGIM de Angular a React, con más de 50 componentes compartidos en 20 apps',
      alt: 'El logo de PGIM.',
      caption: 'Hecho en PGIM',
      notes: {},
    },
    'design-system': {
      title: 'Sistema de diseño de Prudential',
      description:
        'Los botones, formularios y menús compartidos con los que se construyen las apps de Prudential',
      alt: 'La página de inicio de Prudential.com, construida con los componentes del sistema de diseño de Prudential.',
      caption: 'Página de inicio de Prudential.com',
      notes: {
        developerTooling:
          'Escribo plugins y skills que ayudan a que los cambios hechos con IA sigan las convenciones de la biblioteca',
      },
    },
    'market-data': {
      title: 'Panel de datos de mercado',
      description:
        'Gráficos para comparar precios de acciones, hechos para una entrevista con Pharo',
      alt: 'Un gráfico de rendimiento que compara el historial de precios de tres instrumentos de ejemplo.',
      caption: 'Proyecto para una entrevista con Pharo',
      notes: {
        developmentAssistant:
          'Usé Codex para la implementación, las pruebas, la revisión y la documentación, y el panel en sí nunca llama a un modelo',
      },
    },
    'order-entry': {
      title: 'Panel de ingreso de órdenes',
      description:
        'Un formulario de órdenes de trading que verifica los precios al instante, hecho para una entrevista con Schonfeld',
      alt: 'El panel de ingreso de órdenes mostrando actividad de trading de ejemplo.',
      caption: 'Proyecto para una entrevista con Schonfeld',
      notes: {},
    },
    anniversary: {
      title: 'Yni Anniversary',
      description:
        'Una caja de regalo en 3D que mi novia abre para revivir nuestro primer año juntos',
      alt: 'Una caja de regalo rosa en 3D atada con un moño color vino, rodeada de flores y corazones flotantes.',
      caption: 'La escena de apertura en 3D del regalo',
      notes: {},
    },
    portfolio: {
      title: 'Este portafolio',
      description:
        'El sitio en el que estás, con mi trabajo, lo que escribo y mi carrera en un solo lugar',
      alt: 'La página de inicio azul de mi portafolio, con el monograma EV escrito a mano y una presentación personal.',
      caption: 'Página de inicio de este sitio',
      notes: {
        developmentAssistant:
          'Uso Claude Code y Codex para ayudarme a implementar y probar el sitio, y leer una página nunca genera una solicitud de IA',
      },
    },
  },
} as const satisfies Messages['projects'];
