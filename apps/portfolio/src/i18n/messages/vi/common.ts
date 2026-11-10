import type { Messages } from '../../types';

export const common = {
  metadata: {
    title: 'Eduardo Vidals | Kỹ sư phần mềm cấp cao',
    titleTemplate: '%s | Eduardo Vidals',
    siteName: 'Eduardo Vidals',
    description:
      'Eduardo Vidals là kỹ sư phần mềm cấp cao tại Prudential, làm việc với design system và những sản phẩm có khả năng mở rộng. Anh cũng là người sáng lập Velton.',
  },
  skipToContent: 'Chuyển đến nội dung',
  homeLink: 'Eduardo Vidals, trang chủ',
  nav: { label: 'Chính', work: 'Dự án', about: 'Giới thiệu', contact: 'Liên hệ' },
  menu: {
    open: 'Mở menu',
    close: 'Đóng menu',
    dialog: 'Điều hướng trang',
    navigation: 'Di động',
  },
  language: 'Ngôn ngữ',
  footer: { label: 'Chân trang', name: 'Eduardo Vidals', title: 'Kỹ sư phần mềm cấp cao' },
  backToTop: 'Lên đầu trang',
  notFound: {
    title: 'Không tìm thấy trang',
    body: 'Xin lỗi, tôi không tìm thấy trang đó',
    link: 'Tất cả dự án',
  },
} as const satisfies Messages['common'];
