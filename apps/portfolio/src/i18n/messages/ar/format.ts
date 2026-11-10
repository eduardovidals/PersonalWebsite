import type { FormatMessages } from '../../types';

/** i18next strings with interpolated values. Arabic plurals use all six CLDR categories: `_zero`,
 * `_one`, `_two`, `_few` (3 to 10), `_many` (11 to 99) and `_other` (100 and above). */
export const format = {
  allProjects_zero: 'لا توجد مشاريع',
  allProjects_one: 'المشروع الوحيد',
  allProjects_two: 'كلا المشروعين',
  allProjects_few: 'جميع المشاريع الـ{{count}}',
  allProjects_many: 'جميع المشاريع الـ{{count}}',
  allProjects_other: 'جميع المشاريع الـ{{count}}',
  earlyProjects: 'المشاريع الأولى ({{count}})',
  projectCount_zero: 'لا مشاريع',
  projectCount_one: 'مشروع واحد',
  projectCount_two: 'مشروعان',
  projectCount_few: '{{count}} مشاريع',
  projectCount_many: '{{count}} مشروعًا',
  projectCount_other: '{{count}} مشروع',
  toolsUsedOn: 'الأدوات المستخدمة في {{title}}',
  toolsFor: 'أدوات {{group}}',
  aiToolsOn: '{{kind}} في {{title}}',
  seeWork: 'عرض {{title}}',
  nextProject: 'التالي: {{title}}',
  fullPhoneScreenshot: 'لقطة شاشة كاملة من {{title}} على الهاتف',
  fullDesktopScreenshot: 'لقطة شاشة كاملة من {{title}} على سطح المكتب',
  viewFullSize: '{{alt}}، عرض بالحجم الكامل',
  shortestRoute_zero: 'أقصر مسار: لا خطوات',
  shortestRoute_one: 'أقصر مسار: خطوة واحدة',
  shortestRoute_two: 'أقصر مسار: خطوتان',
  shortestRoute_few: 'أقصر مسار: {{count}} خطوات',
  shortestRoute_many: 'أقصر مسار: {{count}} خطوة',
  shortestRoute_other: 'أقصر مسار: {{count}} خطوة',
  mazeDescription_zero:
    'متاهة ثنائية الأبعاد. يستكشف البحث المربعات الزرقاء ويتجنّب الجدران المخطّطة. لا يستغرق أقصر مسار أي خطوة.',
  mazeDescription_one:
    'متاهة ثنائية الأبعاد. يستكشف البحث المربعات الزرقاء ويتجنّب الجدران المخطّطة. يستغرق أقصر مسار خطوة واحدة.',
  mazeDescription_two:
    'متاهة ثنائية الأبعاد. يستكشف البحث المربعات الزرقاء ويتجنّب الجدران المخطّطة. يستغرق أقصر مسار خطوتين.',
  mazeDescription_few:
    'متاهة ثنائية الأبعاد. يستكشف البحث المربعات الزرقاء ويتجنّب الجدران المخطّطة. يستغرق أقصر مسار {{count}} خطوات.',
  mazeDescription_many:
    'متاهة ثنائية الأبعاد. يستكشف البحث المربعات الزرقاء ويتجنّب الجدران المخطّطة. يستغرق أقصر مسار {{count}} خطوة.',
  mazeDescription_other:
    'متاهة ثنائية الأبعاد. يستكشف البحث المربعات الزرقاء ويتجنّب الجدران المخطّطة. يستغرق أقصر مسار {{count}} خطوة.',
  searchComplete_zero: 'اكتمل البحث. أقصر مسار: لا خطوات.',
  searchComplete_one: 'اكتمل البحث. أقصر مسار: خطوة واحدة.',
  searchComplete_two: 'اكتمل البحث. أقصر مسار: خطوتان.',
  searchComplete_few: 'اكتمل البحث. أقصر مسار: {{count}} خطوات.',
  searchComplete_many: 'اكتمل البحث. أقصر مسار: {{count}} خطوة.',
  searchComplete_other: 'اكتمل البحث. أقصر مسار: {{count}} خطوة.',
  replayNumber: 'الإعادة رقم {{count}}.',
} as const satisfies FormatMessages;
