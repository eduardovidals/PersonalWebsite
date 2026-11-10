import type { ReactAriaPackageStrings } from './types.js';

/**
 * Vietnamese for every string React Aria Components 1.22.1 announces or renders, keyed by the
 * package name React Aria requests at runtime. React Aria ships 34 languages but not Vietnamese,
 * so without these a screen reader announces English on Vietnamese pages. `ReactAriaStrings`
 * sends them to the page.
 * @example
 * ```ts
 * reactAriaVietnamese['@react-aria/searchfield']['Clear search']; // 'Xóa tìm kiếm'
 * ```
 */
export const reactAriaVietnamese: ReactAriaPackageStrings = {
  '@react-aria/autocomplete': {
    collectionLabel: 'Gợi ý',
  },
  '@react-aria/breadcrumbs': {
    breadcrumbs: 'Đường dẫn điều hướng',
  },
  '@react-aria/calendar': {
    previous: 'Trước',
    next: 'Tiếp theo',
    selectedDateDescription: (args) => `Ngày đã chọn: ${args.date}`,
    selectedRangeDescription: (args) => `Khoảng đã chọn: ${args.dateRange}`,
    todayDate: (args) => `Hôm nay, ${args.date}`,
    todayDateSelected: (args) => `Hôm nay, ${args.date} đã được chọn`,
    dateSelected: (args) => `${args.date} đã được chọn`,
    startRangeSelectionPrompt: 'Nhấp để bắt đầu chọn khoảng ngày',
    finishRangeSelectionPrompt: 'Nhấp để hoàn tất chọn khoảng ngày',
    minimumDate: 'Ngày khả dụng đầu tiên',
    maximumDate: 'Ngày khả dụng cuối cùng',
    dateRange: (args) => `${args.startDate} đến ${args.endDate}`,
  },
  '@react-aria/color': {
    colorPicker: 'Bộ chọn màu',
    twoDimensionalSlider: 'Thanh trượt 2D',
    colorNameAndValue: (args) => `${args.name}: ${args.value}`,
    colorInputLabel: (args) => `${args.label}, ${args.channelLabel}`,
    colorSwatch: 'mẫu màu',
    transparent: 'trong suốt',
  },
  '@react-aria/combobox': {
    focusAnnouncement: (args, formatter) =>
      `${formatter.select(
        {
          true: () =>
            `Đã vào nhóm ${args.groupTitle}, có ${formatter.plural(Number(args.groupCount), {
              other: () => `${formatter.number(Number(args.groupCount))} tùy chọn`,
            })}. `,
          other: '',
        },
        String(args.isGroupChange),
      )}${args.optionText}${formatter.select({ true: ', đã chọn', other: '' }, String(args.isSelected))}`,
    countAnnouncement: (args, formatter) =>
      `Có ${formatter.plural(Number(args.optionCount), {
        other: () => `${formatter.number(Number(args.optionCount))} tùy chọn`,
      })}.`,
    selectedAnnouncement: (args) => `${args.optionText}, đã chọn`,
    buttonLabel: 'Hiển thị gợi ý',
    listboxLabel: 'Gợi ý',
  },
  '@react-aria/datepicker': {
    era: 'kỷ nguyên',
    year: 'năm',
    month: 'tháng',
    day: 'ngày',
    hour: 'giờ',
    minute: 'phút',
    second: 'giây',
    dayPeriod: 'SA/CH',
    calendar: 'Lịch',
    startDate: 'Ngày bắt đầu',
    endDate: 'Ngày kết thúc',
    weekday: 'ngày trong tuần',
    timeZoneName: 'múi giờ',
    selectedDateDescription: (args) => `Ngày đã chọn: ${args.date}`,
    selectedRangeDescription: (args) => `Khoảng đã chọn: ${args.startDate} đến ${args.endDate}`,
    selectedTimeDescription: (args) => `Thời gian đã chọn: ${args.time}`,
  },
  '@react-aria/dnd': {
    dragItem: (args) => `Kéo ${args.itemText}`,
    dragSelectedItems: (args, formatter) =>
      `Kéo ${formatter.plural(Number(args.count), {
        other: () => `${formatter.number(Number(args.count))} mục đã chọn`,
      })}`,
    dragDescriptionKeyboard: 'Nhấn Enter để bắt đầu kéo.',
    dragDescriptionKeyboardAlt: 'Nhấn Alt + Enter để bắt đầu kéo.',
    dragDescriptionTouch: 'Chạm hai lần để bắt đầu kéo.',
    dragDescriptionVirtual: 'Nhấp để bắt đầu kéo.',
    dragDescriptionLongPress: 'Nhấn và giữ để bắt đầu kéo.',
    dragSelectedKeyboard: (args, formatter) =>
      `Nhấn Enter để kéo ${formatter.plural(Number(args.count), {
        other: () => `${formatter.number(Number(args.count))} mục đã chọn`,
      })}.`,
    dragSelectedKeyboardAlt: (args, formatter) =>
      `Nhấn Alt + Enter để kéo ${formatter.plural(Number(args.count), {
        other: () => `${formatter.number(Number(args.count))} mục đã chọn`,
      })}.`,
    dragSelectedLongPress: (args, formatter) =>
      `Nhấn và giữ để kéo ${formatter.plural(Number(args.count), {
        other: () => `${formatter.number(Number(args.count))} mục đã chọn`,
      })}.`,
    dragStartedKeyboard:
      'Đã bắt đầu kéo. Nhấn Tab để di chuyển đến vị trí thả, sau đó nhấn Enter để thả hoặc nhấn Escape để hủy.',
    dragStartedTouch: 'Đã bắt đầu kéo. Di chuyển đến vị trí thả, sau đó chạm hai lần để thả.',
    dragStartedVirtual:
      'Đã bắt đầu kéo. Di chuyển đến vị trí thả, sau đó nhấp hoặc nhấn Enter để thả.',
    endDragKeyboard: 'Đang kéo. Nhấn Enter để hủy kéo.',
    endDragTouch: 'Đang kéo. Chạm hai lần để hủy kéo.',
    endDragVirtual: 'Đang kéo. Nhấp để hủy kéo.',
    dropDescriptionKeyboard: 'Nhấn Enter để thả. Nhấn Escape để hủy kéo.',
    dropDescriptionTouch: 'Chạm hai lần để thả.',
    dropDescriptionVirtual: 'Nhấp để thả.',
    dropCanceled: 'Đã hủy thả.',
    dropComplete: 'Đã thả xong.',
    dropIndicator: 'chỉ báo vị trí thả',
    dropOnRoot: 'Thả vào',
    dropOnItem: (args) => `Thả vào ${args.itemText}`,
    insertBefore: (args) => `Chèn trước ${args.itemText}`,
    insertBetween: (args) => `Chèn giữa ${args.beforeItemText} và ${args.afterItemText}`,
    insertAfter: (args) => `Chèn sau ${args.itemText}`,
  },
  '@react-aria/grid': {
    deselectedItem: (args) => `Đã bỏ chọn ${args.item}.`,
    select: 'Chọn',
    selectedCount: (args, formatter) =>
      `${formatter.plural(Number(args.count), {
        '=0': 'Không có mục nào được chọn',
        other: () => `Đã chọn ${formatter.number(Number(args.count))} mục`,
      })}.`,
    selectedAll: 'Đã chọn tất cả các mục.',
    selectedItem: (args) => `Đã chọn ${args.item}.`,
    longPressToSelect: 'Nhấn và giữ để vào chế độ chọn.',
  },
  '@react-aria/link-preview': {
    longPressMessage: 'Nhấn và giữ để mở bản xem trước',
  },
  '@react-aria/menu': {
    longPressMessage: 'Nhấn và giữ hoặc nhấn Alt + Mũi tên xuống để mở menu',
  },
  '@react-aria/numberfield': {
    decrease: (args) => `Giảm ${args.fieldLabel}`,
    increase: (args) => `Tăng ${args.fieldLabel}`,
    numberField: 'Trường số',
  },
  '@react-aria/overlays': {
    dismiss: 'Đóng',
  },
  '@react-aria/searchfield': {
    'Clear search': 'Xóa tìm kiếm',
  },
  '@react-aria/spinbutton': {
    Empty: 'Trống',
  },
  '@react-aria/steplist': {
    steplist: 'Danh sách bước',
  },
  '@react-aria/table': {
    select: 'Chọn',
    selectAll: 'Chọn tất cả',
    sortable: 'cột có thể sắp xếp',
    ascending: 'tăng dần',
    descending: 'giảm dần',
    ascendingSort: (args) => `đã sắp xếp tăng dần theo cột ${args.columnName}`,
    descendingSort: (args) => `đã sắp xếp giảm dần theo cột ${args.columnName}`,
    columnSize: (args) => `${args.value} pixel`,
    resizerDescription: 'Nhấn Enter để bắt đầu thay đổi kích thước',
    expand: 'Mở rộng',
    collapse: 'Thu gọn',
  },
  '@react-aria/tag': {
    removeDescription: 'Nhấn Delete để xóa thẻ.',
    removeButtonLabel: 'Xóa',
  },
  '@react-aria/toast': {
    close: 'Đóng',
    notifications: (args, formatter) =>
      `${formatter.plural(Number(args.count), {
        other: () => `${formatter.number(Number(args.count))} thông báo`,
      })}.`,
  },
  '@react-aria/tree': {
    expand: 'Mở rộng',
    collapse: 'Thu gọn',
  },
  '@react-stately/color': {
    hue: 'Sắc độ',
    saturation: 'Độ bão hòa',
    lightness: 'Độ sáng',
    brightness: 'Độ sáng',
    red: 'Đỏ',
    green: 'Xanh lục',
    blue: 'Xanh lam',
    alpha: 'Alpha',
    // Vietnamese puts the hue first and its modifiers after it.
    colorName: (args) => `${args.hue} ${args.chroma} ${args.lightness}`,
    transparentColorName: (args) =>
      `${args.hue} ${args.chroma} ${args.lightness}, trong suốt ${args.percentTransparent}`,
    'very dark': 'rất đậm',
    dark: 'đậm',
    light: 'nhạt',
    'very light': 'rất nhạt',
    pale: 'nhợt',
    grayish: 'ngả xám',
    vibrant: 'tươi',
    black: 'đen',
    white: 'trắng',
    gray: 'xám',
    pink: 'hồng',
    'pink red': 'đỏ hồng',
    'red orange': 'đỏ cam',
    brown: 'nâu',
    orange: 'cam',
    'orange yellow': 'vàng cam',
    'brown yellow': 'vàng nâu',
    yellow: 'vàng',
    'yellow green': 'vàng xanh lục',
    'green cyan': 'xanh ngọc',
    cyan: 'xanh lơ',
    'cyan blue': 'xanh da trời',
    'blue purple': 'tím xanh',
    purple: 'tím',
    'purple magenta': 'tím hồng',
    magenta: 'hồng cánh sen',
    'magenta pink': 'hồng sen',
  },
  '@react-stately/datepicker': {
    rangeUnderflow: (args) => `Giá trị phải là ${args.minValue} hoặc muộn hơn.`,
    rangeOverflow: (args) => `Giá trị phải là ${args.maxValue} hoặc sớm hơn.`,
    rangeReversed: 'Ngày bắt đầu phải trước ngày kết thúc.',
    unavailableDate: 'Ngày đã chọn không khả dụng.',
  },
  'react-aria-components': {
    selectPlaceholder: 'Chọn một mục',
    tableResizer: 'Thanh đổi kích thước',
    dropzoneLabel: 'Vùng thả',
    colorSwatchPicker: 'Các mẫu màu',
  },
};
