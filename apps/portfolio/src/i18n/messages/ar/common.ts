import type { Messages } from '../../types';

export const common = {
  metadata: {
    title: 'إدواردو فيدالز | مهندس برمجيات أول',
    titleTemplate: '%s | إدواردو فيدالز',
    siteName: 'إدواردو فيدالز',
    description:
      'يعمل إدواردو فيدالز مهندس برمجيات أول في Prudential على أنظمة التصميم ومنتجات قابلة للتوسّع. وهو أيضًا مؤسس Velton.',
  },
  skipToContent: 'تخطَّ إلى المحتوى',
  homeLink: 'إدواردو فيدالز، الصفحة الرئيسية',
  nav: { label: 'الرئيسي', work: 'أعمالي', about: 'عنّي', contact: 'تواصل' },
  menu: {
    open: 'فتح القائمة',
    close: 'إغلاق القائمة',
    dialog: 'التنقّل في الموقع',
    navigation: 'المحمول',
  },
  language: 'اللغة',
  footer: { label: 'التذييل', name: 'إدواردو فيدالز', title: 'مهندس برمجيات أول' },
  backToTop: 'العودة إلى الأعلى',
  notFound: {
    title: 'الصفحة غير موجودة',
    body: 'عذرًا، لم أجد هذه الصفحة',
    link: 'كل المشاريع',
  },
} as const satisfies Messages['common'];
