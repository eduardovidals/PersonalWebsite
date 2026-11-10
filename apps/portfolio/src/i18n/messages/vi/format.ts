import type { FormatMessages } from '../../types';

/** i18next strings with interpolated values. Vietnamese has a single plural category, so
 * count-based keys use only the `_other` suffix. */
export const format = {
  allProjects_other: 'Tất cả {{count}} dự án',
  earlyProjects: 'Dự án thời đầu ({{count}})',
  projectCount_other: '{{count}} dự án',
  toolsUsedOn: 'Công cụ dùng trong {{title}}',
  toolsFor: 'Công cụ cho {{group}}',
  aiToolsOn: '{{kind}} trong {{title}}',
  seeWork: 'Xem {{title}}',
  nextProject: 'Tiếp theo: {{title}}',
  fullPhoneScreenshot: 'Ảnh chụp toàn bộ màn hình điện thoại của {{title}}',
  fullDesktopScreenshot: 'Ảnh chụp toàn bộ màn hình máy tính của {{title}}',
  viewFullSize: '{{alt}}, xem kích thước đầy đủ',
  shortestRoute_other: 'Đường đi ngắn nhất: {{count}} bước',
  mazeDescription_other:
    'Một mê cung hai chiều. Thuật toán tìm kiếm duyệt qua các ô màu xanh và tránh những bức tường kẻ sọc. Đường đi ngắn nhất gồm {{count}} bước.',
  searchComplete_other: 'Tìm kiếm hoàn tất. Đường đi ngắn nhất: {{count}} bước.',
  replayNumber: 'Phát lại lần {{count}}.',
} as const satisfies FormatMessages;
