import type { Messages } from '../../types';

export const home = {
  intro: {
    roleAnimation: 'حركة المسمّى الوظيفي',
    roles: ['مهندس برمجيات', 'مطوّر', 'مبرمج'],
    pauseTyping: 'إيقاف الكتابة مؤقتًا',
    resumeTyping: 'استئناف الكتابة',
    greeting: 'مرحبًا، أنا',
    name: 'إدواردو.',
    headline: 'مهندس برمجيات أول في Prudential، أبني أنظمة التصميم ومنتجات قابلة للتوسّع',
    subline: 'وأسّستُ أيضًا Velton، التي تبني برمجيات مخصّصة تملكها الشركات الصغيرة',
    myWork: 'أعمالي',
    emailMe: 'راسلني',
    theseDays: 'هذه الأيام',
    atPrudential: 'في Prudential',
    designSystems: 'أنظمة التصميم',
    myCompany: 'شركتي',
    company: 'Velton Technologies',
    offTheClock: 'خارج العمل',
    hobby: 'تناول KBBQ',
  },
  sectionNav: {
    label: 'في هذه الصفحة',
    work: 'أعمالي',
    career: 'مسيرتي',
    toolkit: 'أدواتي',
    contact: 'تواصل',
  },
  selectedWork: {
    title: 'أعمال مختارة',
    featuredDescription: 'شركتي، تبني برمجيات مخصّصة تملكها الشركات الصغيرة ملكية كاملة',
    featuredLink: 'لماذا أسّستُ Velton',
    designSystem: 'الأزرار والنماذج والقوائم المشتركة التي تستخدمها تطبيقات Prudential',
    anniversary: 'هدية ثلاثية الأبعاد صنعتُها لذكرانا السنوية الأولى',
    pathDemo: 'جرّب العرض التوضيحي لإيجاد المسار',
  },
  pathPlate: {
    algorithm: 'البحث بالعرض أولًا',
    legend: 'المربعات الزرقاء للأماكن التي شملها البحث، والنقاط لأقصر مسار من A إلى B',
    title: 'إيجاد مسار من A إلى B',
    finish: 'إكمال التتبّع',
    replay: 'إعادة التتبّع',
    searching: 'جارٍ البحث في الشبكة.',
  },
  career: {
    eyebrow: 'مسيرتي المهنية',
    title: 'كيف وصلتُ إلى هنا',
    body: 'أدرتُ نادي تطوير البرمجيات في NJCU ودرّستُ في أول معسكر تدريبي لنا في تطوير الواجهات الأمامية خلال تدريبي في PGIM',
    readStory: 'اقرأ قصتي كاملة',
    timeline: 'الخط الزمني لمسيرتي المهنية',
    present: 'الآن',
    jobs: [
      {
        company: 'Smarttwigs',
        role: 'متدرّب في هندسة البرمجيات',
        story:
          'بنيتُ ميزات للويب والهواتف المحمولة بـ React وReact Native، ودمجتُ مدفوعات الاشتراكات عبر Stripe، وأعدتُ هيكلة خدمات الواجهة الخلفية لتتبع اصطلاحات REST',
      },
      {
        company: 'PGIM',
        role: 'متدرّب في هندسة البرمجيات',
        story:
          'نشرتُ حزم Angular قابلة لإعادة الاستخدام، وأضفتُ اختبارات Cypress، وبنيتُ نموذج إثبات المفهوم بـ React الذي أطلق انتقالنا من Angular إلى React',
      },
      {
        company: 'PGIM',
        role: 'مهندس برمجيات',
        story:
          'قدتُ انتقال PInnacle، المنصة التي يقوم عليها 20 تطبيقًا داخليًا، من Angular إلى React، وقدتُ تطوير أكثر من 15 تطبيقًا مبنيًا بـ React، .NET، وSQL',
      },
      {
        company: 'Prudential Financial',
        role: 'مهندس برمجيات أول',
        story:
          'أبني مكوّنات React وTypeScript تراعي إمكانية الوصول لنظام التصميم في Prudential، ومنتجات قابلة للتوسّع',
      },
    ],
  },
  toolkit: {
    title: 'أدواتي',
    intro:
      'أطلقتُ تطبيقات React، .NET، وSQL في PGIM، وفي أعمالي الخاصة على الواجهة الخلفية أفضّل NestJS على Fastify مع PostgreSQL وKysely',
    everyday: 'أدواتي اليومية',
    aiHeading: 'الذكاء الاصطناعي ووكلاء البرمجة',
    aiList: 'أدوات الذكاء الاصطناعي',
    more: 'أدوات أكثر',
    fewer: 'أدوات أقل',
    groups: {
      webMobile: 'الويب والأجهزة المحمولة',
      dataState: 'التوجيه والبيانات والحالة',
      designSystems: 'أنظمة التصميم',
      chartsMotion: 'الرسوم البيانية والأبعاد الثلاثية والحركة',
      apisStorage: 'واجهات API والتخزين',
      testing: 'الاختبار وإمكانية الوصول',
      delivery: 'أدوات المطوّرين والتسليم',
      infrastructure: 'بيئات التشغيل والبنية التحتية',
      aws: 'محوّلات AWS',
      identityPayments: 'الهوية والمدفوعات',
      languages: 'لغات برمجة أخرى',
    },
  },
  contact: {
    title: 'لنتحدّث',
    body: 'راسلني بخصوص وظيفة، أو مشروع، أو حديث على فنجان قهوة',
    emailDirectly: 'راسلني مباشرةً',
    form: {
      legend: 'أرسل رسالة إلى إدواردو',
      name: 'اسمك',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      send: 'إرسال الرسالة',
      sending: 'جارٍ الإرسال…',
      sent: 'أُرسلت الرسالة. شكرًا على تواصلك!',
      failed:
        'تعذّر تأكيد وصول الرسالة. مسودتك ما زالت هنا؛ ويمكنك أيضًا المراسلة مباشرةً عبر البريد الإلكتروني.',
      nameRequired: 'أدخل اسمك.',
      emailInvalid: 'أدخل عنوان بريد إلكتروني صالحًا.',
      messageRequired: 'اكتب رسالة أولًا.',
    },
  },
} as const satisfies Messages['home'];
