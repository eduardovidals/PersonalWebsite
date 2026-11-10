Dự án tiếp theo tôi thực hiện cùng Smarttwigs là Benev. Đây là một nền tảng chuyên kết nối các thương hiệu, tổ chức phi lợi nhuận và influencer để thúc đẩy thay đổi xã hội.

Nếu bạn chưa đọc, dự án trước đó tôi làm cùng Smarttwigs là [Props.](/projects/props/)

Tôi đã mang những kiến thức học được từ Props áp dụng vào trang web Benev.

Lúc đó, ứng dụng di động của Benev đang được phát triển, còn nhiệm vụ của tôi là xây dựng một trang web responsive từ đầu. Tôi cũng là lập trình viên duy nhất làm trang web này, nên tôi quyết định phát triển một trang web React-Redux sử dụng Styled Components, giúp các lập trình viên sau này dễ dàng tiếp tục công việc một khi tôi đã đặt nền móng cho dự án.

Màn hình đầu tiên của trang web cho phép người dùng đăng ký hoặc đăng nhập vào tài khoản, với những hiệu ứng chuyển động mượt mà, tinh tế giúp trải nghiệm trở nên hiện đại hơn, như bạn có thể thấy trong đoạn ghi hình dưới đây.

![Luồng đăng ký của Benev](/work/benev-signup-flow.mp4)

## Carousel gói đăng ký của Benev

Một phần quan trọng khác của trang web là tính năng cho phép người dùng mua gói đăng ký ngay trên trang, và đó cũng là phần tôi phụ trách.

![Carousel gói đăng ký của Benev](/work/benev-payments.webp)

Giao diện của trang web rất giống với thiết kế của Props, nhưng code trong Props chỉ cho phép carousel có ba gói. Vì vậy, tôi phải tái cấu trúc code hiện có để carousel chấp nhận số lượng thẻ bất kỳ, đồng thời tách nó thành một component để dễ dàng thay đổi về sau. Nhờ đó, đoạn code dưới đây đã ra đời:

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

Như bạn thấy ở trên, code được đơn giản hóa nhờ styled-components và việc tổng quát hóa các component như PlanCard và Carousel. Không chỉ vậy, thay vì truyền nhiều props riêng lẻ vào một component, component sẽ nhận một đối tượng JSON chứa sẵn tất cả các trường đã định nghĩa, nhờ đó code cực kỳ dễ đọc và dễ thay đổi.

## Trang thanh toán của Benev

Nhưng chưa dừng lại ở đó, tôi còn tích hợp Payment Element của Stripe vào trang web, và việc này đòi hỏi tôi phải thay đổi cả front-end lẫn back-end.

Dưới đây là màn hình thanh toán khi người dùng chọn một gói đăng ký từ carousel.

![Trang thanh toán của Benev](/work/benev-checkout.webp)

Tóm lại, tôi xây dựng trang web Benev với code sạch nhất có thể, để các lập trình viên sau này dễ dàng làm việc trên đó mà không bị bối rối bởi những quy ước tôi đặt ra.

Kỳ thực tập là một trải nghiệm tuyệt vời, và cơ hội thú vị tiếp theo của tôi là trở thành thực tập sinh kỹ sư phần mềm tại PGIM!

Cảm ơn bạn đã đọc, và mời bạn xem thêm về [các dự án khác của tôi!](/projects/)
