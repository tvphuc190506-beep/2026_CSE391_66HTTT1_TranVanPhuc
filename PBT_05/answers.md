Câu A1 — Viewport & Mobile-First

1. **Thẻ <meta name="viewport"> chuẩn:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
Giải thích thuộc tính:

width=device-width: Đặt chiều rộng trang web bằng chiều rộng thiết bị.

initial-scale=1.0: Thiết lập tỷ lệ thu phóng ban đầu là 100%.

Nếu THIẾU thẻ này trên iPhone:

Trình duyệt sẽ tự giả lập một màn hình lớn khoảng 980px.

Sau đó thu nhỏ toàn bộ giao diện lại cho vừa màn hình điện thoại.

Kết quả là chữ, hình ảnh, nút bấm sẽ biến thành tí hon cực kỳ khó đọc.

Phân biệt Mobile-First và Desktop-First:

Mobile-First: Viết CSS cho màn hình nhỏ trước, dùng @media (min-width: ...) để bổ sung cho màn hình lớn.

Desktop-First: Viết CSS cho màn hình lớn trước, dùng @media (max-width: ...) để co bóp cho màn hình nhỏ.

Lý do khuyên dùng Mobile-First: Giúp tối ưu tốc độ tải trang, tiết kiệm băng thông 3G/4G/5G, và phù hợp với xu thế người dùng smartphone chiếm đa số hiện nay.





Câu A2 — BreakpointsKích thước pixelThiết bị đại diệnSố cột hiển thịMặc định (< 768px)Mobile (Điện thoại dọc)Hiển thị 1 cộtTừ 768px đến 1023pxTablet (Máy tính bảng)Hiển thị 2 cộtTừ 1024px trở lênDesktop (PC, Laptop lớn)Hiển thị 4 cột



Câu A3

— Media QueriesBảng tính toán chiều rộng (width) của thẻ .container:Chiều rộng màn hìnhChiều rộng .container375px (iPhone SE)100% (Ăn theo CSS gốc)600px540px (Thỏa mãn mốc >= 576px)800px720px (Thỏa mãn mốc >= 768px)1000px960px (Thỏa mãn mốc >= 992px)1400px1140px (Thỏa mãn mốc >= 1200px)



Câu A4 — SCSS Basics
Variables ($primary-color): - Dùng để lưu trữ một giá trị cốt lõi (như mã màu, font chữ) vào một biến.

Khi cần đổi, chỉ sửa 1 nơi thay vì tìm hàng trăm dòng CSS.

Nesting (CSS lồng nhau): - Viết các bộ chọn lồng vào nhau theo đúng phân cấp HTML.

Giúp code gọn gàng, dễ quản lý, không lặp tên cha.

Mixins (@mixin và @include): - Là một khối CSS định nghĩa sẵn một lần, có thể truyền tham số.

Chỗ nào cần chỉ việc gọi ra, giảm gõ trùng lặp code.

Inheritance (@extend): - Cho phép bộ chọn này kế thừa toàn bộ thuộc tính của bộ chọn khác.

Tại sao trình duyệt không đọc trực tiếp file .scss?

Vì các trình duyệt hiện nay chỉ nhận diện và xử lý được file .css tiêu chuẩn.

Bước chuyển đổi SCSS sang CSS:

Phải dùng công cụ biên dịch (như Live Sass Compiler trên VS Code).

Hoặc dùng lệnh terminal để dịch ngược file .scss thành file .css




PHẦN C — PHÂN TÍCH
Câu C1 — Phân tích trang web thực tế (Chọn trang: YouTube)
Thanh điều hướng (Navigation Bar):

Desktop: Hiện thực đơn dọc đầy đủ chữ và icon bên trái.

Tablet: Ẩn phần chữ, chỉ giữ lại icon xếp gọn một dải mỏng.

Mobile: Ẩn hoàn toàn menu trái, chuyển thành thanh 5 nút nằm ngang dưới đáy màn hình.

Lưới hiển thị nội dung (Video Grid):

Desktop: Hiển thị rộng rãi dạng lưới gồm 4 cột video trên một hàng.

Tablet: Tự động co cụm lại thành lưới gồm 2 cột video trên một hàng.

Mobile: Giãn rộng full màn hình, hiển thị hàng dọc 1 cột video duy nhất từ trên xuống.

Các phần tử bị ẩn đi trên Mobile: - Menu cánh trái, khung Chat trực tiếp khi xem livestream, danh sách video gợi ý phụ bên phải.

Kích thước font chữ (Font size): - Tiêu đề video ở Desktop lớn (18px - 20px). Xuống Mobile tự co nhỏ về (14px - 16px) để tránh tràn dòng.

Đoạn mã @media tìm thấy trong DevTools:

@media (min-width: 1200px): Tính toán độ rộng lưới video lớn.

@media (max-width: 767px): Ẩn menu trái, cho video full bề ngang.




Câu C2 — Thiết kế Responsive Strategy (Dự án: Đặt bàn nhà hàng)
1. Bố cục layout trên 3 thiết bị:
Mobile Layout: Xếp dọc 1 cột. Header dùng nút 3 gạch (Hamburger). Lưới món ăn 1 cột dọc. Form đặt bàn đẩy lên trước, bản đồ nhúng 100% nằm đáy trang.

Tablet Layout: Header hiện menu rút gọn. Lưới 6 món ăn chia thành 2 cột đều nhau. Form đặt bàn và bản đồ xếp nối tiếp nhau.

Desktop Layout: Hiện đầy đủ menu ngang. Lưới món ăn dàn đều thành 3 cột lớn. Phần cuối chia đôi: 50% bên trái làm Form đặt bàn, 50% bên phải làm Bản đồ Google Maps song song.

2. Mã nguồn CSS Skeleton phác thảo khung xương (Mobile-First):
CSS
/* GIAO DIỆN MOBILE (<768px) */
.header { display: flex; justify-content: space-between; align-items: center; }
.nav-menu { display: none; }
.hamburger { display: block; }
.food-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
.booking-section { display: grid; grid-template-columns: 1fr; gap: 20px; }
.booking-form { order: 1; }
.google-maps { order: 2; }

/* TABLET BREAKPOINT (>= 768px) */
@media (min-width: 768px) {
  .food-grid { grid-template-columns: repeat(2, 1fr); }
}

/* DESKTOP BREAKPOINT (>= 1024px) */
@media (min-width: 1024px) {
  .nav-menu { display: flex; gap: 25px; }
  .hamburger { display: none; }
  .food-grid { grid-template-columns: repeat(3, 1fr); }
  .booking-section { grid-template-columns: 1fr 1fr; }
}
3. Câu lệnh biên dịch tự động SCSS sang CSS đã sử dụng:
Bash
sass --watch scss/style.scss scss/style.css