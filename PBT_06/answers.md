Câu A1 — Grid System

Dựa trên đoạn mã HTML đề bài cung cấp, bảng phân tích số cột hiển thị của các Box như sau:

| Kích thước | < 768px | 768px - 991px | >= 992px |
| :--- | :--- | :--- | :--- |
| **Số cột** | 1 cột duy nhất | 2 cột song song | 4 cột trên hàng |
| **Box layout** | 4 ô xếp dọc thẳng hàng | 2 ô một hàng (thành 2 hàng) | Toàn bộ 4 ô nằm ngang |

**Câu hỏi thêm:**
* `col-md-6` nghĩa là gì? 
Nghĩa là trên thiết bị có màn hình trung bình (Medium devices $\ge$ 768px), 
mỗi hộp phần tử con sẽ chiếm đúng 6 ô trên tổng số 12 ô của hàng (tức là rộng 50% hàng).
* Tại sao không cần viết `col-sm-12`?
Vì theo cơ chế Mobile-First, class `col-12` viết trước đó đã tự động áp dụng 
bố cục chiếm trọn 100% bề ngang cho tất cả các màn hình nhỏ từ mức Mobile lên đến Tablet rồi.



Câu A2 — Utilities & Components

1. **Giải thích lớp `d-none d-md-block`:**
* `d-none`: Ẩn hoàn toàn phần tử này trên mọi kích thước màn hình (mặc định từ Mobile).
* `d-md-block`: Hiện lại phần tử này dưới dạng khối từ màn hình cỡ trung bình (Tablet $\ge$ 768px) trở lên.
* *Ứng dụng:* Dùng để ẩn thanh menu chữ dài trên điện thoại và hiện ra trên máy tính.

2. **Liệt kê 5 lớp tiện ích khoảng cách (Spacing Utilities):**
* `mt-3`: Viết tắt của Margin Top, tạo khoảng cách trống phía trên phần tử rộng 1rem (16px).
* `px-4`: Viết tắt của Padding Left và Padding Right, tạo khoảng cách đệm lề trái và phải rộng 1.5rem (24px).
* `mb-auto`: Tự động đẩy khoảng cách Margin Bottom ra mức tối đa để ép phần tử dưới bám sát đáy.
* `ms-2`: Viết tắt của Margin Start (Margin Left), tạo khoảng cách trống bên trái phần tử rộng 0.5rem (8px).
* `p-0`: Triệt tiêu hoàn toàn khoảng cách đệm padding ở cả 4 phía về bằng 0.

3. **Sự khác nhau giữa `.container`, `.container-fluid`, và `.container-md`:**
* `.container`: Thẻ bọc có độ rộng cố định (responsive pixel) thay đổi nhảy theo từng nấc breakpoint.
* `.container-fluid`: Thẻ bọc luôn co dãn full tràn viền 100% chiều rộng ở mọi cấp độ màn hình.
* `.container-md`: Tràn viền 100% trên Mobile và Tablet, chỉ bắt đầu cố định kích thước khi từ mốc màn hình $\ge$ 768px trở lên.





Câu A2 — Utilities & Components

1. **Giải thích lớp `d-none d-md-block`:**
* `d-none`: Ẩn hoàn toàn phần tử này trên mọi kích thước màn hình (mặc định từ Mobile).
* `d-md-block`: Hiện lại phần tử này dưới dạng khối từ màn hình cỡ trung bình (Tablet $\ge$ 768px) trở lên.
* *Ứng dụng:* Dùng để ẩn thanh menu chữ dài trên điện thoại và hiện ra trên máy tính.

2. **Liệt kê 5 lớp tiện ích khoảng cách (Spacing Utilities):**
* `mt-3`: Viết tắt của Margin Top, tạo khoảng cách trống phía trên phần tử rộng 1rem (16px).
* `px-4`: Viết tắt của Padding Left và Padding Right, tạo khoảng cách đệm lề trái và phải rộng 1.5rem (24px).
* `mb-auto`: Tự động đẩy khoảng cách Margin Bottom ra mức tối đa để ép phần tử dưới bám sát đáy.
* `ms-2`: Viết tắt của Margin Start (Margin Left), tạo khoảng cách trống bên trái phần tử rộng 0.5rem (8px).
* `p-0`: Triệt tiêu hoàn toàn khoảng cách đệm padding ở cả 4 phía về bằng 0.

3. **Sự khác nhau giữa `.container`, `.container-fluid`, và `.container-md`:**
* `.container`: Thẻ bọc có độ rộng cố định (responsive pixel) thay đổi nhảy theo từng nấc breakpoint.
* `.container-fluid`: Thẻ bọc luôn co dãn full tràn viền 100% chiều rộng ở mọi cấp độ màn hình.
* `.container-md`: Tràn viền 100% trên Mobile và Tablet, chỉ bắt đầu cố định kích thước khi từ mốc màn hình $\ge$ 768px trở lên.







PHẦN C — PHÂN TÍCH

### Câu C1 — Tùy biến Bootstrap

1. **Quy trình thay đổi mã màu mặc định `$primary` sang màu `#E63946`:**
* Bước 1: Cần chuẩn bị công cụ biên dịch Sass/SCSS cài đặt trên máy.
* Bước 2: Tạo một file nhánh cấu hình riêng, ví dụ tên là `custom.scss`.
* Bước 3: Khai báo đè giá trị biến màu mới trước khi import Bootstrap vào:
  `$primary: #E63946;`
  `@import "node_modules/bootstrap/scss/bootstrap";`
* Bước 4: Chạy lệnh compile file `custom.scss` để xuất bản ra file `custom.css` mới chứa màu tùy biến.

2. **Tại sao KHÔNG nên ghi đè trực tiếp `.btn-primary { background: red; }`?**
Vì làm như vậy chỉ đổi được màu nền bề nổi mà không đồng bộ được hệ sinh thái đi kèm của Bootstrap. 
Các hiệu ứng hover, active, focus, màu viền border, màu bóng đổ (box-shadow) của nút 
vẫn giữ nguyên màu xanh cũ, gây lỗi thẩm mỹ đồng bộ của giao diện.





Câu C2 — So sánh Bootstrap vs CSS thuần

| Tiêu chí so sánh | Viết bằng CSS thuần | Sử dụng Bootstrap 5 Framework |
| :--- | :--- | :--- |
| **Số dòng cần viết** | Rất nhiều (phải tự viết từ HTML sang hàng trăm dòng CSS) | Cực kỳ ít (chỉ gõ class có sẵn vào thẻ HTML, không cần file CSS phụ) |
| **Thời gian phát triển**| Lâu, mất nhiều công sức căn chỉnh, test lỗi | Siêu nhanh, dựng khung responsive hoàn thiện trong vài phút |
| **Khả năng tùy biến** | Vô hạn, muốn chỉnh chi tiết nhỏ nào cũng được | Bị bó buộc vào khung mẫu chung, muốn sửa sâu phải am hiểu SCSS biến |
| **Khi nào NÊN dùng** | Trang landing page độc lạ, portfolio cá nhân đầy tính nghệ thuật | Dự án quản trị Admin Dashboard, hệ thống thương mại điện tử cần làm nhanh |
