كان المشروع التالي الذي عملتُ عليه مع Smarttwigs هو Benev، وهي منصة مكرّسة لربط العلامات التجارية والمنظمات غير الربحية والمؤثرين من أجل تعزيز التغيير الاجتماعي.

وفي حال فاتك ذلك، فقد كان المشروع السابق الذي عملتُ عليه مع Smarttwigs هو [Props](/projects/props/).

استفدتُ مما تعلّمته في Props وطبّقته على موقع Benev.

كان تطبيق Benev للهواتف المحمولة قيد التطوير، لكن مهمتي كانت بناء موقع متجاوب من الصفر. وكنتُ المطوّر الوحيد الذي يعمل على الموقع، فقرّرتُ تطويره بـ React-Redux مع Styled Components، حتى يسهل على المطوّرين من بعدي العمل عليه بعد أن أضع أساس المشروع.

تتيح الشاشة الأولى في الموقع للمستخدمين إنشاء حساب أو تسجيل الدخول إلى حساباتهم، وفيها حركات انتقالية أنيقة وسلسة تمنح المستخدم تجربة عصرية، كما يظهر في المقطع المسجّل أدناه.

![مسار التسجيل في Benev](/work/benev-signup-flow.mp4)

## العارض الدوّار لاشتراكات Benev

ومن الجوانب المهمة الأخرى في الموقع أنني عملتُ على تمكين المستخدمين من شراء خطط الاشتراك من خلاله.

![العارض الدوّار لاشتراكات Benev](/work/benev-payments.webp)

تشبه واجهة الموقع تصميم Props إلى حد كبير، لكن الشيفرة في Props لم تكن تسمح للعارض الدوّار إلا بثلاث خطط. لذلك اضطررتُ إلى إعادة هيكلة الشيفرة الحالية بحيث يقبل العارض الدوّار أي عدد من البطاقات، وجعلتُه مكوّنًا مستقلًا يسهل تعديله مستقبلًا. وبفضل ذلك أصبحت الشيفرة التالية ممكنة:

```tsx
function ChoosePlans() {
  const [planType, setPlanType] = useState('Business');

  // show plans by type
  // NOTE: DO NOT DELETE, each plan should have their own carousel with a
  // UNIQUE key to prevent the animations from transitioning from the previous
  // state of another carousel component, the key tells React that it is a
  // new instance of the component, rather than the same instance
  const showPlans = (planType: string) => {
    switch (planType) {
      case 'Business':
        return (
          <Carousel planType={planType} setPlanType={setPlanType} key={planType}>
            <PlanCard planJson={businessPlans.entrepreneurLite} />
            <PlanCard planJson={businessPlans.premium} />
            <PlanCard planJson={businessPlans.enterprise} />
          </Carousel>
        );
      case 'School':
        return (
          <Carousel planType={planType} setPlanType={setPlanType} key={planType}>
            <PlanCard planJson={schoolPlans.premiere} />
            <PlanCard planJson={schoolPlans.elite} />
            <PlanCard planJson={schoolPlans.superStar} />
          </Carousel>
        );
      case 'Family':
        return (
          <Carousel planType={planType} setPlanType={setPlanType} key={planType}>
            <PlanCard planJson={familyPlans.familyPlan} />
          </Carousel>
        );
    }

    return <PlanCard planJson={familyPlans.familyPlan} />;
  };

  return (
    <>
      <ChoosePlansNavBar />

      <ChoosePlansContainer>
        <ChoosePlansHeadersContainer>
          <ChoosePlansHeader>BENEV</ChoosePlansHeader>
          <ChoosePlansSubText>ORGANIZATION PLANS</ChoosePlansSubText>
        </ChoosePlansHeadersContainer>

        {showPlans(planType)}
      </ChoosePlansContainer>
    </>
  );
}
```

كما هو موضّح أعلاه، أصبحت الشيفرة أبسط بفضل styled-components وتعميم مكوّنات مثل PlanCard وCarousel. وليس ذلك فحسب، بل بدلًا من تمرير خصائص (props) متعددة إلى المكوّن، يُمرَّر إليه كائن JSON يحتوي على جميع الحقول المعرّفة مسبقًا، مما يجعل قراءة الشيفرة وتعديلها سهلًا للغاية.

## صفحة الدفع في Benev

لكن هذا ليس كل شيء، إذ عملتُ على تشغيل Payment Element من Stripe في الموقع، وتطلّب ذلك إجراء تغييرات في الواجهة الأمامية والخلفية معًا.

وفيما يلي شاشة الدفع عند اختيار خطة اشتراك من العارض الدوّار.

![صفحة الدفع في Benev](/work/benev-checkout.webp)

وخلاصة القول، أنشأتُ موقع Benev بأنظف شيفرة ممكنة، حتى يتمكن المطوّرون من بعدي من العمل عليه بسهولة دون أن تربكهم الاصطلاحات التي وضعتُها.

كان التدريب تجربة رائعة، وكانت فرصتي المثيرة التالية الحصول على وظيفة متدرّب في هندسة البرمجيات لدى PGIM!

شكرًا على القراءة، ويمكنك الاطلاع على المزيد من [مشاريعي الأخرى!](/projects/)
