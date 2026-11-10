import type { FormatMessages } from '../../types';

/** i18next strings with interpolated values. Spanish plurals use the CLDR `_one`, `_many` and
 * `_other` categories; `_many` matches `_other`. */
export const format = {
  allProjects_one: 'Ver {{count}} proyecto',
  allProjects_many: 'Ver los {{count}} proyectos',
  allProjects_other: 'Ver los {{count}} proyectos',
  earlyProjects: 'Primeros proyectos ({{count}})',
  projectCount_one: '{{count}} proyecto',
  projectCount_many: '{{count}} proyectos',
  projectCount_other: '{{count}} proyectos',
  toolsUsedOn: 'Herramientas usadas en {{title}}',
  toolsFor: 'Herramientas: {{group}}',
  aiToolsOn: '{{kind}} en {{title}}',
  seeWork: 'Ver {{title}}',
  nextProject: 'Siguiente: {{title}}',
  fullPhoneScreenshot: 'Captura de pantalla completa de {{title}} en teléfono',
  fullDesktopScreenshot: 'Captura de pantalla completa de {{title}} en escritorio',
  viewFullSize: '{{alt}}, ver en tamaño completo',
  shortestRoute_one: 'Ruta más corta: {{count}} paso',
  shortestRoute_many: 'Ruta más corta: {{count}} pasos',
  shortestRoute_other: 'Ruta más corta: {{count}} pasos',
  mazeDescription_one:
    'Un laberinto bidimensional. La búsqueda explora los cuadros azules y evita los muros con rayas. La ruta más corta toma {{count}} paso.',
  mazeDescription_many:
    'Un laberinto bidimensional. La búsqueda explora los cuadros azules y evita los muros con rayas. La ruta más corta toma {{count}} pasos.',
  mazeDescription_other:
    'Un laberinto bidimensional. La búsqueda explora los cuadros azules y evita los muros con rayas. La ruta más corta toma {{count}} pasos.',
  searchComplete_one: 'Búsqueda terminada. Ruta más corta: {{count}} paso.',
  searchComplete_many: 'Búsqueda terminada. Ruta más corta: {{count}} pasos.',
  searchComplete_other: 'Búsqueda terminada. Ruta más corta: {{count}} pasos.',
  replayNumber: 'Repetición {{count}}.',
} as const satisfies FormatMessages;
