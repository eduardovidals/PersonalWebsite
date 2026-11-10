import type { Messages } from '../../types';

export const about = {
  eyebrow: 'عن إدواردو',
  title: 'قصتي',
  description:
    'يتحدّث إدواردو فيدالز عن الفرق والتطبيقات والشركات الصغيرة التي شكّلت طريقة تفكيره في بناء البرمجيات.',
} as const satisfies Messages['about'];
