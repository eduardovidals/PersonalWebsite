import type { Messages } from '../../types';

export const home = {
  intro: {
    roleAnimation: 'Hiệu ứng chức danh',
    roles: ['Kỹ sư phần mềm', 'Nhà phát triển', 'Lập trình viên'],
    pauseTyping: 'Tạm dừng gõ chữ',
    resumeTyping: 'Tiếp tục gõ chữ',
    greeting: 'Chào bạn, tôi là',
    name: 'Eduardo.',
    headline:
      'Kỹ sư phần mềm cấp cao tại Prudential, xây dựng design system và những sản phẩm có khả năng mở rộng',
    subline:
      'Tôi cũng sáng lập Velton, nơi xây dựng phần mềm theo yêu cầu cho các doanh nghiệp nhỏ, và phần mềm đó thuộc về chính họ',
    myWork: 'Dự án của tôi',
    emailMe: 'Gửi email cho tôi',
    theseDays: 'Dạo này',
    atPrudential: 'Tại Prudential',
    designSystems: 'Design system',
    myCompany: 'Công ty của tôi',
    company: 'Velton Technologies',
    offTheClock: 'Ngoài giờ làm',
    hobby: 'Ăn KBBQ',
  },
  sectionNav: {
    label: 'Trên trang này',
    work: 'Dự án',
    career: 'Sự nghiệp',
    toolkit: 'Công cụ',
    contact: 'Liên hệ',
  },
  selectedWork: {
    title: 'Dự án tiêu biểu',
    featuredDescription:
      'Công ty của tôi, chuyên xây dựng phần mềm theo yêu cầu mà doanh nghiệp nhỏ được sở hữu hoàn toàn',
    featuredLink: 'Vì sao tôi sáng lập Velton',
    designSystem: 'Các nút, biểu mẫu và menu dùng chung cho các ứng dụng của Prudential',
    anniversary: 'Món quà 3D tôi làm cho ngày kỷ niệm một năm của chúng tôi',
    pathDemo: 'Thử bản demo tìm đường',
  },
  pathPlate: {
    algorithm: 'Tìm kiếm theo chiều rộng',
    legend: 'Ô xanh là những nơi đã tìm, dấu chấm là một đường đi ngắn nhất từ A đến B',
    title: 'Tìm đường từ A đến B',
    finish: 'Hoàn tất tìm kiếm',
    replay: 'Phát lại tìm kiếm',
    searching: 'Đang tìm kiếm trên lưới.',
  },
  career: {
    eyebrow: 'Sự nghiệp của tôi',
    title: 'Hành trình đến hôm nay',
    body: 'Tôi điều hành câu lạc bộ phát triển phần mềm tại NJCU và dạy khóa bootcamp frontend đầu tiên của câu lạc bộ trong lúc thực tập tại PGIM',
    readStory: 'Đọc toàn bộ câu chuyện của tôi',
    timeline: 'Dòng thời gian sự nghiệp',
    present: 'Hiện tại',
    jobs: [
      {
        company: 'Smarttwigs',
        role: 'Thực tập sinh kỹ sư phần mềm',
        story:
          'Tôi xây dựng tính năng web và di động bằng React và React Native, tích hợp thanh toán gói đăng ký qua Stripe, và tái cấu trúc các service backend theo quy ước REST',
      },
      {
        company: 'PGIM',
        role: 'Thực tập sinh kỹ sư phần mềm',
        story:
          'Tôi phát hành các package Angular tái sử dụng được, bổ sung kiểm thử bằng Cypress, và xây dựng bản proof of concept bằng React, khởi đầu cho việc chuyển từ Angular sang React',
      },
      {
        company: 'PGIM',
        role: 'Kỹ sư phần mềm',
        story:
          'Tôi dẫn dắt việc chuyển PInnacle, nền tảng đứng sau 20 ứng dụng nội bộ, từ Angular sang React, và dẫn dắt phát triển 15+ ứng dụng xây dựng bằng React, .NET và SQL',
      },
      {
        company: 'Prudential Financial',
        role: 'Kỹ sư phần mềm cấp cao',
        story:
          'Tôi xây dựng các component React và TypeScript đảm bảo khả năng tiếp cận cho Design System của Prudential, cùng những sản phẩm có khả năng mở rộng',
      },
    ],
  },
  toolkit: {
    title: 'Bộ công cụ',
    intro:
      'Tôi đã phát hành các ứng dụng React, .NET và SQL tại PGIM, còn với các dự án backend của riêng mình, tôi thích dùng NestJS trên Fastify cùng PostgreSQL và Kysely',
    everyday: 'Công cụ hằng ngày',
    aiHeading: 'AI và agent lập trình',
    aiList: 'Công cụ AI',
    more: 'Xem thêm công cụ',
    fewer: 'Thu gọn công cụ',
    groups: {
      webMobile: 'Web và di động',
      dataState: 'Định tuyến, dữ liệu và state',
      designSystems: 'Design system',
      chartsMotion: 'Biểu đồ, 3D và chuyển động',
      apisStorage: 'API và lưu trữ',
      testing: 'Kiểm thử và khả năng tiếp cận',
      delivery: 'Công cụ phát triển và triển khai',
      infrastructure: 'Runner và hạ tầng',
      aws: 'Adapter AWS',
      identityPayments: 'Định danh và thanh toán',
      languages: 'Ngôn ngữ khác',
    },
  },
  contact: {
    title: 'Cùng trò chuyện',
    body: 'Gửi email cho tôi về một vị trí công việc, một dự án, hay một buổi cà phê trò chuyện',
    emailDirectly: 'Gửi email trực tiếp',
    form: {
      legend: 'Gửi tin nhắn cho Eduardo',
      name: 'Tên của bạn',
      email: 'Địa chỉ email',
      message: 'Tin nhắn',
      send: 'Gửi tin nhắn',
      sending: 'Đang gửi…',
      sent: 'Đã gửi tin nhắn. Cảm ơn bạn đã liên hệ!',
      failed:
        'Không thể xác nhận tin nhắn đã được gửi. Bản nháp của bạn vẫn còn ở đây; bạn cũng có thể gửi email trực tiếp.',
      nameRequired: 'Vui lòng nhập tên của bạn.',
      emailInvalid: 'Vui lòng nhập địa chỉ email hợp lệ.',
      messageRequired: 'Vui lòng viết tin nhắn trước.',
    },
  },
} as const satisfies Messages['home'];
