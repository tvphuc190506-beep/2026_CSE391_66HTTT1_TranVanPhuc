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
Câu C1 (10đ) — Debug Form
Dựa trên hình ảnh image_0b0377.png, dưới đây là 8 lỗi kèm cách sửa:
Lỗi 1 (Accessibility): Input "Tên" thiếu <label for="...">.
Sửa: <label for="fullname">Tên:</label> <input type="text" id="fullname" name="fullname" required>
Lỗi 2 (Best Practice): Email thiếu nhãn dán (Label) và thuộc tính required.
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" required>
Lỗi 3 (Validation): Password chưa có độ dài tối thiểu (minlength).
Sửa: <input type="password" name="pwd" minlength="8" required>
Lỗi 4 (Logic): Hai ô Password có cùng placeholder gây nhầm lẫn (phải là "Nhập lại mật khẩu").
Sửa: Ô thứ hai đổi placeholder thành "Xác nhận mật khẩu".
Lỗi 5 (Semantics): Phone nên dùng type="tel" thay vì type="text".
Sửa: <input type="tel" id="phone" value="0901234567" pattern="[0-9]{10}">
Lỗi 6 (Best Practice): Thẻ <select> thiếu thuộc tính name để gửi dữ liệu về server.
Sửa: <select name="city" id="city">
Lỗi 7 (Accessibility): Checkbox "Tôi đồng ý..." nằm trong label nhưng thiếu thẻ <input type="checkbox">.
Sửa: <label><input type="checkbox" name="terms" required> Tôi đồng ý điều khoản</label>
Lỗi 8 (Validation): Nút gửi dùng value="Gửi" nhưng thiếu thuộc tính id hoặc dùng thẻ <button> cho chuyên nghiệp hơn.
Sửa: <button type="submit">Gửi</button>
Câu C2 (10đ) — Thiết kế chiến lược Validation
Đây là phần quan trọng về tư duy bảo mật cho ứng dụng ngân hàng:
1. Viết pattern regex:
CMND/CCCD (12 chữ số): pattern="[0-9]{12}"
Số tài khoản (10-15 chữ số): pattern="[0-9]{10,15}"
2. HTML5 validation đủ an toàn cho ngân hàng chưa? Tại sao?
Trả lời: KHÔNG đủ an toàn.
Tại sao: Vì HTML5 validation diễn ra ở Client-side (Trình duyệt). Người dùng hoặc hacker có thể dễ dàng dùng F12 (Developer Tools) để xóa bỏ các thuộc tính required hoặc pattern, hoặc dùng các công cụ như Postman để gửi dữ liệu trực tiếp lên server mà không thông qua form.
3. Liệt kê 3 loại validation mà HTML5 KHÔNG THỂ làm được:
Kiểm tra tính duy nhất (Uniqueness): Ví dụ kiểm tra xem Email/Số tài khoản đã tồn tại trong Database hay chưa.
Xác nhận khớp dữ liệu (Cross-field validation): Ví dụ so sánh ô "Mật khẩu" và "Xác nhận mật khẩu" có giống nhau không.
Kiểm tra logic nghiệp vụ phức tạp: Ví dụ kiểm tra xem số dư tài khoản có đủ để thực hiện giao dịch hay không.
4. Nêu 2 rủi ro bảo mật nếu chỉ validate trên Frontend:
Dữ liệu rác (Data Corruption): Hacker có thể gửi các đoạn mã script (XSS) hoặc dữ liệu sai định dạng làm hỏng hệ thống cơ sở dữ liệu.
Tấn công SQL Injection: Nếu không validate ở Backend, hacker có thể chèn các câu lệnh SQL vào ô input để đánh cắp hoặc xóa toàn bộ dữ liệu ngân hàng.