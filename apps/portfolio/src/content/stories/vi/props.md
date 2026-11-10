Chào bạn! Trước tiên, để tôi giải thích ý tưởng đằng sau Props, một ứng dụng do Smarttwigs phát triển.

Props là một nền tảng giúp nhân viên, phụ huynh và giáo viên củng cố những hành vi tốt nhất trong nhóm của mình bằng cách chọn các phần thưởng có chủ đích và trao lời ghi nhận (props) theo cách để cả nhóm noi theo.

Props có một ứng dụng di động và một trang web, và phần lớn công việc của tôi là hiện thực các REST API, xây dựng ứng dụng bằng React Native và tạo một trang web để xử lý thanh toán.

Trong suốt thời gian thực tập tại Smarttwigs, tôi đã học được quy trình làm việc trong môi trường Agile cùng những khái niệm quan trọng như lấy dữ liệu, quản lý state toàn cục, REST API và thiết kế cơ sở dữ liệu.

## Xây dựng REST API

Trước kỳ thực tập, tôi hoàn toàn mù tịt về REST API và luôn thắc mắc vì sao nó lại xuất hiện nhiều đến vậy trong CV mẫu của các kỹ sư phần mềm khác.

Thế nhưng, chỉ vài tuần sau khi bắt đầu thực tập, tôi được giao hiện thực một số chức năng ở back-end theo chuẩn RESTful. Tôi **hoàn toàn không biết** phải bắt đầu từ đâu, nhưng rồi dần quen với các thuật ngữ như path parameter, query parameter, request body, giao thức HTTP và quy ước đặt tên cho các endpoint REST API.

Tất cả là một trải nghiệm học hỏi tuyệt vời, vì cuối cùng tôi đã hiểu được tầm quan trọng của REST API và vì sao nó có thể là một phần then chốt trong CV.

Trong thời gian làm việc với Smarttwigs, tôi đã xây dựng và cải tiến nhiều service cho Props, chẳng hạn như tái cấu trúc toàn bộ codebase theo quy ước RESTful, và xây dựng các chức năng mới như hệ thống bảng xếp hạng số props được trao trong một nhóm, hay tính năng cho phép người dùng xem họ có những nhóm chung với nhau hay không.

Tôi thực sự thích làm việc ở backend vì đây là phần cốt lõi tạo nên chức năng của ứng dụng, nhưng tôi cũng làm việc với React Native để xây dựng ứng dụng di động cho Props.

## Sử dụng React Native

Tôi cũng tham gia một phần cùng nhóm front-end để xây dựng Props. Tôi làm việc với một nhóm nhỏ các lập trình viên và một product manager phụ trách theo dõi tiến độ phát triển ứng dụng. Về kiến thức mới, tôi chỉ cần học thêm vài khái niệm của React Native, vì về cơ bản nó chính là React nhưng có các component cho phép bạn đưa ứng dụng lên iOS, Android và các nền tảng native khác.

Tôi phụ trách chức năng của nhiều màn hình, chẳng hạn như màn hình đăng ký với nhiều tính năng quan trọng như đăng nhập bằng mạng xã hội, tạo người dùng ở back-end và chỉnh sửa hồ sơ cá nhân.

![Màn hình đăng ký của Props](/work/props-signup.webp) ![Màn hình chỉnh sửa hồ sơ của Props](/work/props-edit-profile.webp)

Quan trọng hơn, tôi còn làm màn hình cho phép mua gói đăng ký ngay trong ứng dụng.

![Các gói đăng ký của Props](/work/props-iap.webp)

Tuy nhiên, vì Apple thu phí trên các giao dịch mua trong ứng dụng, chúng tôi đã xây dựng một trang web để xử lý thanh toán cho gói đăng ký mà người dùng muốn mua. Người dùng có thể vào trang web, đăng nhập và chọn gói đăng ký mình muốn.

![Trang web của Props](/work/props-website.webp)

Làm các màn hình front-end tương đối đơn giản, nhưng xây dựng endpoint xử lý giao dịch mua thì khó hơn nhiều, vì chúng tôi phải tính đến những trường dữ liệu quan trọng cần có khi xử lý thanh toán gói đăng ký. Tôi dùng API của Stripe để xử lý các khoản thanh toán qua web và lưu thông tin liên quan vào cơ sở dữ liệu.

Nhìn chung, tôi đã học được rất nhiều kiến thức nền tảng về front-end, back-end và cơ sở dữ liệu.

Sau khi hoàn tất việc phát triển Props, tôi quyết định áp dụng những gì đã học vào dự án tiếp theo cùng Smarttwigs, [Benev.](/projects/benev/)
