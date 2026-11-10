/** i18next strings with interpolated values. Plural keys use i18next's `_one`/`_other` suffixes;
 * each language adds the plural categories its grammar needs. */
export const format = {
  allProjects_one: 'All {{count}} project',
  allProjects_other: 'All {{count}} projects',
  earlyProjects: 'Early projects ({{count}})',
  projectCount_one: '{{count}} project',
  projectCount_other: '{{count}} projects',
  toolsUsedOn: 'Tools used on {{title}}',
  toolsFor: 'Tools for {{group}}',
  aiToolsOn: '{{kind}} on {{title}}',
  seeWork: 'See {{title}}',
  nextProject: 'Next: {{title}}',
  fullPhoneScreenshot: 'Full phone screenshot of {{title}}',
  fullDesktopScreenshot: 'Full desktop screenshot of {{title}}',
  viewFullSize: '{{alt}}, view full size',
  shortestRoute_one: 'Shortest route: {{count}} step',
  shortestRoute_other: 'Shortest route: {{count}} steps',
  mazeDescription_one:
    'A two-dimensional maze. The search explores blue squares and avoids the striped walls. The shortest route takes {{count}} step.',
  mazeDescription_other:
    'A two-dimensional maze. The search explores blue squares and avoids the striped walls. The shortest route takes {{count}} steps.',
  searchComplete_one: 'Search complete. Shortest route: {{count}} step.',
  searchComplete_other: 'Search complete. Shortest route: {{count}} steps.',
  replayNumber: 'Replay {{count}}.',
} as const;
