Chào bạn! Có lẽ bạn đã đọc về quá trình tôi [xây dựng công cụ trực quan hóa thuật toán sắp xếp.](/projects/sorting-visualizer/)

Nếu chưa thì cũng không sao, dự án trực quan hóa thuật toán tìm đường này là một phần của dự án lớn hơn mang tên AlgoVisual, với mục tiêu trực quan hóa các thuật toán sắp xếp và tìm đường phổ biến. Dự án cũng phần lớn lấy cảm hứng từ [công cụ trực quan hóa thuật toán tìm đường của Clément Mihailescu.](https://github.com/clementmihailescu/Pathfinding-Visualizer)

Sau khi đã làm được công cụ trực quan hóa thuật toán sắp xếp bằng React, tôi muốn thử thách bản thân hơn nữa bằng cách xây dựng công cụ trực quan hóa thuật toán tìm đường.

Quá trình xây dựng công cụ này tiêu tốn rất nhiều giờ để nghiên cứu các khái niệm nền tảng về đồ thị, node, và cách thuật toán dùng cấu trúc dữ liệu để tìm đến đích.

Công cụ trực quan hóa thuật toán tìm đường là một quá trình học hỏi rất lớn, vì có nhiều tính năng tôi muốn đưa vào, chẳng hạn như thay đổi tốc độ mô phỏng, thêm tường/trọng số, di chuyển node bắt đầu/kết thúc, và có thể xóa toàn bộ lưới hoặc chỉ xóa đường đi đã tìm được.

Ban đầu, tôi bắt đầu với một phiên bản cơ bản, chỉ trực quan hóa DFS bằng một nút bấm đơn giản. Sau khi công cụ đã tạo được hiệu ứng cho cả các node đã duyệt lẫn các node trên đường đi, tôi tiếp tục xây dựng giao diện và các tính năng, rồi đến chức năng thêm tường và trọng số.

Phần vất vả nhất là hiện thực các thuật toán tìm đường, vì phải hiểu thấu đáo chúng mới biết node nào cần được đánh dấu là node đã duyệt hay node trên đường đi. Không chỉ vậy, việc nắm được trực giác đằng sau thuật toán và cách cài đặt chúng cũng là một thử thách, chẳng hạn như Dijkstra và A*, những thuật toán tuyệt vời khi đã hiểu, và còn tuyệt hơn nữa khi được trực quan hóa!

Tôi cũng cài đặt thêm Best-First Search sau khi học về thuật toán này trong lớp AI ở trường, và việc cài đặt rất thú vị vì nó rất giống A*!

Sau khi học tất cả các thuật toán và hiểu các khái niệm nền tảng của chúng, tôi đã hoàn thiện công cụ với khả năng tạo mê cung, thêm tường, trọng số, và di chuyển node bắt đầu/kết thúc trên lưới. Đó là một thử thách, nhưng cũng là một trải nghiệm học hỏi tuyệt vời!

Cảm ơn bạn đã đọc, và mời bạn xem thêm về [các dự án khác của tôi!](/projects/)

## Liên kết và tài liệu tham khảo

- [Trang web AlgoVisual](https://eduardovidals.github.io/AlgoVisual)
- [Công cụ trực quan hóa thuật toán tìm đường của Clément Mihailescu](https://github.com/clementmihailescu/Pathfinding-Visualizer)
- [Responsive Web Design của freeCodeCamp](https://www.freecodecamp.org/learn/responsive-web-design)
- [Algorithms Part I của Robert Sedgewick & Kevin Wayne](https://www.coursera.org/learn/algorithms-part1)
- [Algorithms Part II của Robert Sedgewick & Kevin Wayne](https://www.coursera.org/learn/algorithms-part2)
