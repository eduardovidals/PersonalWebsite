import type { Messages } from '../../types';

export const velton = {
  title: 'Velton',
  description:
    'تبني Velton برمجيات مخصّصة للشركات الصغيرة. يرى أصحابها كل خيار وتكلفته، ويحتفظون بالشيفرة.',
  subtitle:
    'برمجيات مخصّصة للشركات الصغيرة، يرى فيها أصحابها كل خيار وتكلفته، ويملكون الشيفرة بمجرد سداد ثمنها',
  backToProjects: 'المشاريع',
  careerStory: 'قصة مسيرتي المهنية',
} as const satisfies Messages['velton'];
