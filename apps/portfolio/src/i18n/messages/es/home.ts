import type { Messages } from '../../types';

export const home = {
  intro: {
    roleAnimation: 'Animación de roles',
    roles: ['Ingeniero de software', 'Desarrollador', 'Programador'],
    pauseTyping: 'Pausar escritura',
    resumeTyping: 'Reanudar escritura',
    greeting: 'Hola, soy',
    name: 'Eduardo.',
    headline:
      'Ingeniero de software sénior en Prudential, donde creo sistemas de diseño y productos que escalan',
    subline:
      'También fundé Velton, que crea software a la medida que es propiedad de los pequeños negocios',
    myWork: 'Mi trabajo',
    emailMe: 'Escríbeme',
    theseDays: 'Hoy en día',
    atPrudential: 'En Prudential',
    designSystems: 'Sistemas de diseño',
    myCompany: 'Mi empresa',
    company: 'Velton Technologies',
    offTheClock: 'Fuera del trabajo',
    hobby: 'Comer KBBQ',
  },
  sectionNav: {
    label: 'En esta página',
    work: 'Trabajo',
    career: 'Carrera',
    toolkit: 'Herramientas',
    contact: 'Contacto',
  },
  selectedWork: {
    title: 'Trabajo destacado',
    featuredDescription:
      'Mi empresa, que crea software a la medida que los pequeños negocios poseen por completo',
    featuredLink: 'Por qué fundé Velton',
    designSystem: 'Los botones, formularios y menús compartidos que usan las apps de Prudential',
    anniversary: 'Un regalo en 3D que hice para nuestro primer aniversario',
    pathDemo: 'Prueba la demo de búsqueda de rutas',
  },
  pathPlate: {
    algorithm: 'Búsqueda en anchura',
    legend:
      'Los cuadros azules marcan las casillas exploradas, y los puntos, una ruta más corta de A a B',
    title: 'Encontrar una ruta de A a B',
    finish: 'Terminar recorrido',
    replay: 'Repetir recorrido',
    searching: 'Buscando en la cuadrícula.',
  },
  career: {
    eyebrow: 'Mi carrera',
    title: 'Cómo llegué aquí',
    body: 'Dirigí el club de desarrollo de software de NJCU y di nuestro primer bootcamp de frontend mientras hacía una pasantía en PGIM',
    readStory: 'Lee mi historia completa',
    timeline: 'Cronología profesional',
    present: 'Actualidad',
    jobs: [
      {
        company: 'Smarttwigs',
        role: 'Pasante de ingeniería de software',
        story:
          'Desarrollé funciones web y móviles con React y React Native, integré pagos de suscripciones con Stripe y refactoricé nuestros servicios de backend para seguir las convenciones REST',
      },
      {
        company: 'PGIM',
        role: 'Pasante de ingeniería de software',
        story:
          'Publiqué paquetes reutilizables de Angular, agregué pruebas con Cypress y construí la prueba de concepto en React que dio inicio a nuestra migración de Angular a React',
      },
      {
        company: 'PGIM',
        role: 'Ingeniero de software',
        story:
          'Dirigí la migración de Angular a React en PInnacle, la plataforma detrás de 20 apps internas, y lideré el desarrollo de más de 15 apps hechas con React, .NET y SQL',
      },
      {
        company: 'Prudential Financial',
        role: 'Ingeniero de software sénior',
        story:
          'Creo componentes accesibles con React y TypeScript para el sistema de diseño de Prudential, además de productos que escalan',
      },
    ],
  },
  toolkit: {
    title: 'Herramientas',
    intro:
      'He lanzado apps con React, .NET y SQL en PGIM, y para mi propio trabajo de backend me gusta NestJS sobre Fastify con PostgreSQL y Kysely',
    everyday: 'Herramientas del día a día',
    aiHeading: 'IA y agentes de programación',
    aiList: 'Herramientas de IA',
    more: 'Más herramientas',
    fewer: 'Menos herramientas',
    groups: {
      webMobile: 'Web y móvil',
      dataState: 'Enrutamiento, datos y estado',
      designSystems: 'Sistemas de diseño',
      chartsMotion: 'Gráficos, 3D y animación',
      apisStorage: 'APIs y almacenamiento',
      testing: 'Pruebas y accesibilidad',
      delivery: 'Herramientas de desarrollo y entrega',
      infrastructure: 'Runners e infraestructura',
      aws: 'Adaptadores de AWS',
      identityPayments: 'Identidad y pagos',
      languages: 'Otros lenguajes',
    },
  },
  contact: {
    title: 'Hablemos',
    body: 'Escríbeme sobre un puesto, un proyecto o un café para conversar',
    emailDirectly: 'Escríbeme directamente',
    form: {
      legend: 'Envíale un mensaje a Eduardo',
      name: 'Tu nombre',
      email: 'Correo electrónico',
      message: 'Mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando…',
      sent: 'Mensaje enviado. ¡Gracias por escribir!',
      failed:
        'No se pudo confirmar el envío. Tu borrador sigue aquí; también puedes escribirme directamente por correo.',
      nameRequired: 'Escribe tu nombre.',
      emailInvalid: 'Escribe un correo electrónico válido.',
      messageRequired: 'Primero escribe un mensaje.',
    },
  },
} as const satisfies Messages['home'];
