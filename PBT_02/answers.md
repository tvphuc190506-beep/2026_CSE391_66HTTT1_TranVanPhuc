Câu A1 — Input Types (5đ)

1, type="email" → ô nhập text, tự kiểm tra có @ → dùng cho form đăng ký tài khoản
2, type="password" → ký tự bị ẩn (•••) → dùng nhập mật khẩu khi login
3, type="number" → có nút tăng/giảm số → dùng nhập số lượng sản phẩm
4, type="tel" → bàn phím số trên mobile → nhập số điện thoại khách hàng
5, type="date" → hiện date picker → chọn ngày giao hàng
6, type="file" → nút upload file → upload ảnh sản phẩm / avatar
7, type="checkbox" → ô tick nhiều lựa chọn → chọn nhiều sản phẩm / điều khoản
8, type="radio" → chọn 1 trong nhiều → chọn phương thức thanh toán
9, type="range" → thanh kéo → chọn mức giá (price filter)
10, type="search" → ô tìm kiếm (có nút clear) → tìm sản phẩm

Câu A3 — Accessibility (5đ)
1. Vì sao <label for="email"> quan trọng?
Screen reader đọc được tên của input
Click vào label → focus vào input
Tăng khả năng truy cập (accessibility)
2. Khi nào dùng <fieldset> + <legend>?
→ Khi nhóm nhiều input liên quan
Ví dụ:
<fieldset>
  <legend>Chọn giới tính</legend>
  <input type="radio" name="gender"> Nam
  <input type="radio" name="gender"> Nữ
</fieldset>
3. aria-label dùng khi nào?
→ Khi KHÔNG có <label>
Ví dụ:
<input type="text" aria-label="Tìm kiếm">
Không nên dùng nếu đã có <label> vì:
Bị trùng thông tin

Câu A4 — Media (5đ)
1. loading="lazy" là gì?
→ Chỉ load ảnh khi gần tới màn hình
Cải thiện:
Tốc độ tải trang
Giảm băng thông
không nên dùng khi:
Ảnh ở trên cùng (hero banner)
2. Vì sao dùng nhiều <source> trong <video>?
→ Đảm bảo chạy trên nhiều trình duyệt
Format phổ biến:
MP4
WebM
Ogg
3. Viết alt
Ảnh iPhone 16
→ alt="iPhone 16 màu titan nhìn từ mặt trước"
Ảnh trang trí
→ alt="" (để rỗng)
Biểu đồ doanh thu
→ alt="Biểu đồ doanh thu quý 1 năm 2026 tăng dần qua các tháng"

Câu A5 — So sánh <figure> vs <img> (5đ)
Cách 1 (<img>)
Dùng khi:
Ảnh đơn giản, không cần mô tả thêm
Ví dụ:
<img src="logo.png" alt="Logo Shopee">
<img src="banner.jpg" alt="Banner giảm giá">
Cách 2 (<figure>)
Dùng khi:
Cần caption (chú thích)
Ảnh có ý nghĩa nội dung
Ví dụ:
<figure>
  <img src="product.jpg" alt="iPhone 16 Pro Max">
  <figcaption>iPhone 16 Pro Max – 25.990.000đ</figcaption>
</figure>
<figure>
  <img src="chart.png" alt="Biểu đồ doanh thu">
  <figcaption>Doanh thu quý 1 tăng 20%</figcaption>
</figure>