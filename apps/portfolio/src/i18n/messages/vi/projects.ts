import type { Messages } from '../../types';

export const projects = {
  page: {
    title: 'Dự án',
    description:
      'Design system tại Prudential, PInnacle tại PGIM và các dự án độc lập của Eduardo.',
    intro:
      'Công việc của tôi tại Prudential và PGIM, công ty Velton của tôi, và những thứ tôi làm cho vui',
    home: 'Trang chủ',
    filterLabel: 'Hiển thị',
    filters: {
      all: 'Tất cả dự án',
      career: 'Sự nghiệp',
      personal: 'Cá nhân',
      business: 'Kinh doanh',
    },
    notes: 'Công cụ và ghi chú phát triển',
  },
  detail: {
    allProjects: 'Tất cả dự án',
    breadcrumb: 'Đường dẫn trang',
    details: 'Chi tiết dự án',
    context: 'Bối cảnh',
    builtWith: 'Công nghệ sử dụng',
    caseStudy: 'Case study',
    moreProjects: 'Dự án khác',
    viewFullSize: 'Xem kích thước đầy đủ:',
    desktopScreenshot: 'Ảnh chụp màn hình máy tính',
    phoneScreenshot: 'Ảnh chụp màn hình điện thoại',
    originalScreenshot: 'Ảnh chụp màn hình gốc',
    fullScreenshot: 'Ảnh chụp đầy đủ',
    fullSize: 'Kích thước đầy đủ',
    codeSample: 'Đoạn code mẫu có thể cuộn',
    downloadRecording: 'Tải xuống đoạn ghi hình',
  },
  aiKinds: {
    productFeature: 'Tính năng sản phẩm',
    developerTooling: 'Công cụ cho lập trình viên',
    developmentAssistant: 'Trợ lý phát triển',
  },
  items: {
    props: {
      title: 'Props',
      category: 'Phát triển sản phẩm',
      context: 'Thực tập tại Smarttwigs',
      caption: 'Các màn hình di động, thanh toán gói đăng ký và API đứng sau bảng xếp hạng',
      description:
        'Tôi học REST bằng cách xây dựng một bảng xếp hạng mà mọi người thực sự dùng được, bên cạnh các màn hình di động và luồng thanh toán gói đăng ký',
      coverAlt: 'Bản lưu trữ quy trình thiết lập tài khoản Props, từ đăng ký đến chọn gói đăng ký.',
      signupAlt: 'Màn hình đăng ký của ứng dụng Props.',
      subscriptionAlt: 'Màn hình gói đăng ký của ứng dụng Props.',
    },
    benev: {
      title: 'Benev',
      category: 'Phát triển sản phẩm',
      context: 'Thực tập tại Smarttwigs',
      caption: 'Carousel gói thành viên kết nối với trang thanh toán Stripe',
      description:
        'Tôi xây dựng carousel để chọn gói thành viên và kết nối lựa chọn đó với trang thanh toán Stripe',
      coverAlt:
        'Màn hình chào mừng của Benev, với thanh bên minh họa và các loại tài khoản để lựa chọn.',
    },
    'sorting-visualizer': {
      title: 'Trực quan hóa thuật toán sắp xếp',
      category: 'Trực quan hóa thuật toán',
      context: 'AlgoVisual',
      caption: 'Ba thuật toán sắp xếp được mô phỏng từng bước một',
      description:
        'Ba thuật toán có thể cho ra cùng một danh sách đã sắp xếp, nên tôi tạo hiệu ứng cho từng bước để thấy mỗi thuật toán làm việc khác nhau ra sao',
      coverAlt: 'Các thanh màu xanh nhạt sắp xếp lại trong quá trình merge sort trên AlgoVisual.',
    },
    'pathfinding-visualizer': {
      title: 'Trực quan hóa thuật toán tìm đường',
      category: 'Trực quan hóa thuật toán',
      context: 'AlgoVisual',
      caption: 'Các thuật toán tìm kiếm khác nhau tìm đường qua cùng một mê cung',
      description:
        'Xem thuật toán dò tìm những đâu trước khi tìm ra lộ trình, rồi đổi thuật toán và xem điều gì thay đổi',
      coverAlt: 'Thuật toán A* vạch lộ trình qua một mê cung được tạo tự động trên AlgoVisual.',
    },
    '3d-sorting-visualizer': {
      title: 'Trực quan hóa thuật toán sắp xếp 3D',
      category: 'Đồ họa máy tính',
      context: 'Môn học tại NJCU',
      caption: 'Hiệu ứng sắp xếp mà bạn có thể đi xuyên qua trong không gian 3D',
      description:
        'Trong lớp đồ họa máy tính, tôi đưa các thanh sắp xếp ra khỏi trang web và tạo một khung cảnh mà bạn có thể đi lại bên trong khi chúng chuyển động',
      coverAlt: 'Merge sort sắp xếp lại các thanh dựng đứng trong một khung cảnh 3D.',
    },
    'solar-system': {
      title: 'Hệ Mặt Trời',
      category: 'Đồ họa máy tính',
      context: 'Môn học tại NJCU',
      caption: 'Mô hình 3D về chuyển động tự quay và quỹ đạo của các hành tinh',
      description:
        'Tôi dùng các hành tinh để học cách các chuyển động kết hợp với nhau trong không gian 3D, với mỗi hành tinh tự quay quanh trục trong khi bay quanh Mặt Trời',
      coverAlt: 'Mặt Trời và các hành tinh có texture trên quỹ đạo, giữa nền trời đầy sao.',
    },
  },
  work: {
    'software-factory': {
      title: 'Velton',
      description:
        'Công ty của tôi, chuyên xây dựng phần mềm theo yêu cầu mà doanh nghiệp nhỏ được sở hữu hoàn toàn',
      alt: 'Trang chủ Velton: “Phần mềm xây dựng quanh doanh nghiệp của bạn” bên cạnh Owen, trợ lý tìm hiểu nhu cầu của Velton.',
      caption: 'Trang chủ Velton đang phát triển',
      notes: {
        productFeature:
          'Owen giúp xác định thay đổi cần làm, còn Iris chỉnh sửa và kiểm thử một bản nháp riêng biệt để con người xem xét',
        developerTooling: 'Tôi đóng gói các skill kỹ thuật của repository cho Claude Code và Codex',
      },
    },
    'pgim-platform': {
      title: 'PInnacle',
      description:
        'Tôi dẫn dắt việc chuyển nền tảng ứng dụng nội bộ của PGIM từ Angular sang React, với 50+ component dùng chung trên 20 ứng dụng',
      alt: 'Logo PGIM.',
      caption: 'Xây dựng tại PGIM',
      notes: {},
    },
    'design-system': {
      title: 'Design System của Prudential',
      description: 'Các nút, biểu mẫu và menu dùng chung để xây dựng các ứng dụng của Prudential',
      alt: 'Trang chủ Prudential.com, được xây dựng bằng các component từ design system của Prudential.',
      caption: 'Trang chủ Prudential.com',
      notes: {
        developerTooling:
          'Tôi viết plugin và skill giúp những thay đổi có AI hỗ trợ tuân theo quy ước của thư viện',
      },
    },
    'market-data': {
      title: 'Dashboard dữ liệu thị trường',
      description: 'Biểu đồ so sánh giá cổ phiếu, xây dựng cho buổi phỏng vấn với Pharo',
      alt: 'Biểu đồ hiệu suất so sánh lịch sử giá của ba công cụ tài chính mẫu.',
      caption: 'Dự án phỏng vấn Pharo',
      notes: {
        developmentAssistant:
          'Tôi dùng Codex để hiện thực, kiểm thử, review và viết tài liệu, còn bản thân dashboard không bao giờ gọi đến mô hình AI',
      },
    },
    'order-entry': {
      title: 'Dashboard nhập lệnh',
      description:
        'Biểu mẫu đặt lệnh giao dịch với kiểm tra giá tức thì, xây dựng cho buổi phỏng vấn với Schonfeld',
      alt: 'Dashboard nhập lệnh hiển thị hoạt động giao dịch mẫu.',
      caption: 'Dự án phỏng vấn Schonfeld',
      notes: {},
    },
    anniversary: {
      title: 'Yni Anniversary',
      description:
        'Hộp quà 3D để bạn gái tôi mở ra và cùng nhớ lại năm đầu tiên bên nhau của chúng tôi',
      alt: 'Hộp quà 3D màu hồng thắt nơ đỏ đô, xung quanh là hoa và những trái tim lơ lửng.',
      caption: 'Cảnh mở quà 3D',
      notes: {},
    },
    portfolio: {
      title: 'Trang portfolio này',
      description: 'Trang web bạn đang xem, nơi tập hợp các dự án, bài viết và sự nghiệp của tôi',
      alt: 'Trang chủ portfolio màu xanh của tôi với chữ lồng EV viết tay và phần giới thiệu bản thân.',
      caption: 'Trang chủ của trang web này',
      notes: {
        developmentAssistant:
          'Tôi dùng Claude Code và Codex để hỗ trợ hiện thực và kiểm thử trang web, và việc đọc một trang không bao giờ kích hoạt yêu cầu AI nào',
      },
    },
  },
} as const satisfies Messages['projects'];
