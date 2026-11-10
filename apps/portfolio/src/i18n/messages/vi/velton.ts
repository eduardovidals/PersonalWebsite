import type { Messages } from '../../types';

export const velton = {
  title: 'Velton',
  description:
    'Velton xây dựng phần mềm theo yêu cầu cho các doanh nghiệp nhỏ. Chủ doanh nghiệp thấy rõ mọi lựa chọn cùng chi phí của nó, và được giữ mã nguồn.',
  subtitle:
    'Phần mềm theo yêu cầu cho doanh nghiệp nhỏ, nơi chủ doanh nghiệp thấy rõ mọi lựa chọn cùng chi phí của nó, và sở hữu mã nguồn khi đã thanh toán xong',
  backToProjects: 'Dự án',
  careerStory: 'Câu chuyện sự nghiệp của tôi',
} as const satisfies Messages['velton'];
