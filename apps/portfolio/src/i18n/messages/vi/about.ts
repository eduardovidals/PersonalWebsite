import type { Messages } from '../../types';

export const about = {
  eyebrow: 'Về Eduardo',
  title: 'Câu chuyện của tôi',
  description:
    'Eduardo Vidals kể về những đội ngũ, ứng dụng và doanh nghiệp nhỏ đã định hình cách anh suy nghĩ về việc xây dựng phần mềm.',
} as const satisfies Messages['about'];
