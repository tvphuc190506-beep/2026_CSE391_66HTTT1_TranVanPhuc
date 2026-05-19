Câu A1
1. Inline CSS (Nhúng trực tiếp vào thẻ HTML)
Ví dụ code:

HTML
<h1 style="color: red; font-size: 24px;">Tiêu đề Inline</h1>
Ưu điểm: Tiện lợi, áp dụng nhanh cho một thẻ duy nhất; độ ưu tiên cực kỳ cao (ghi đè được hầu hết các cách viết CSS khác).

Nhược điểm: Làm code HTML bị rối, khó bảo trì, không thể tái sử dụng (nếu có 10 thẻ <h1> muốn giống nhau thì phải copy dán 10 lần).

Khi nào nên dùng: Khi cần test nhanh giao diện, áp dụng style động bằng JavaScript, hoặc làm các template gửi Email HTML (vì nhiều email client bắt buộc dùng inline).

2. Internal CSS (Nhúng vào thẻ <style> trong file HTML)
Ví dụ code:

HTML
<head>
    <style>
        p { color: blue; }
    </style>
</head>
<body>
    <p>Đoạn văn Internal</p>
</body>
Ưu điểm: Dễ dàng chia sẻ style cho toàn bộ các thẻ bên trong cùng một trang HTML đó mà không cần tạo file riêng; trang web tải về thành 1 file duy nhất.

Nhược điểm: Tăng dung lượng file HTML, không thể chia sẻ style này sang các trang web khác (ví dụ từ trang chủ sang trang giới thiệu).

Khi nào nên dùng: Dùng cho các landing page chỉ có 1 trang duy nhất, hoặc khi trang web đó có những style đặc thù không áp dụng cho nơi nào khác.

3. External CSS (Nhúng từ file .css bên ngoài)
Ví dụ code:
File style.css:

CSS
body { background-color: #f0f0f0; }
File index.html:

HTML
<head>
    <link rel="stylesheet" href="style.css">
</head>
Ưu điểm: Tách biệt hoàn toàn giao diện (CSS) và cấu trúc (HTML). Code cực kỳ gọn gàng, dễ bảo trì, tái sử dụng được cho hàng trăm trang web khác nhau. Trình duyệt có thể lưu bộ nhớ đệm (cache) file CSS giúp trang web tải nhanh hơn ở các lần sau.

Nhược điểm: Cần tốn thêm 1 request (yêu cầu mạng) ban đầu để tải file .css về.

Khi nào nên dùng: Đây là cách tiêu chuẩn và khuyên dùng nhất cho mọi dự án website thực tế.

❓ Câu hỏi thêm: Cách nào "thắng" khi áp dụng đồng thời?
Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, Inline CSS sẽ là cách "thắng".

Giải thích:
Theo quy tắc tính độ ưu tiên (Specificity) của trình duyệt:

Inline CSS được tính trọng số ưu tiên cao nhất (điểm số tương đương 1,0,0,0).
## Câu A3 (7đ) — Box Model — Tính toán kích thước

### Trường hợp 1: content-box (mặc định)
Công thức `content-box`: `width` chỉ là chiều rộng của phần lõi (content).

- **Chiều rộng hiển thị (thực tế render trên browser bao gồm cả viền):**
  Width + Padding Trái/Phải + Border Trái/Phải
  = 400 + (20 * 2) + (5 * 2) = 400 + 40 + 10 = **450px**

- **Không gian chiếm trên trang (tính cả khoảng đẩy margin):**
  Chiều rộng hiển thị + Margin Trái/Phải
  = 450 + (10 * 2) = **470px**

---

### Trường hợp 2: border-box
Công thức `border-box`: `width` đã gộp sẵn trọn gói Lõi + Padding + Border.

- **Chiều rộng hiển thị:** Đúng bằng giá trị của width = **400px**

- **Kích thước content thực tế (lõi chữ bị ép nhỏ lại):**
  Width - Padding Trái/Phải - Border Trái/Phải
  = 400 - 40 - 10 = **350px**

- **Không gian chiếm trên trang:**
  Width + Margin Trái/Phải
  = 400 + 20 = **420px**

---

### Trường hợp 3: Margin collapse (Gộp lề)

- **Khoảng cách giữa box-a và box-b:** **40px**

- **Giải thích tại sao KHÔNG PHẢI 65px:**
  Trong CSS, khi hai margin dọc (top/bottom) của hai block element nằm liền kề nhau, chúng sẽ không cộng dồn (25 + 40 = 65) mà sẽ xảy ra hiện tượng **Margin Collapse** (Gộp lề). Trình duyệt sẽ lấy giá trị **lớn hơn** trong hai giá trị đó để làm khoảng cách chung. Vì 40 > 25 nên khoảng cách thực tế là 40px.

---

### 🔥 Nâng cao: box-a có margin-bottom: -10px và box-b có margin-top: 40px

- **Khoảng cách =** **30px**

- **Giải thích:** Khi có 1 margin dương và 1 margin âm gặp nhau, quy tắc gộp lề sẽ áp dụng phép **cộng đại số** hai giá trị đó lại với nhau: 40 + (-10) = 30px.

<br>

## Câu A4 (5đ) — Specificity (Độ ưu tiên)

Quy tắc tính điểm Specificity theo bộ số `(ID, Class, Tag)`:
- **Rule A:** `p` -> 1 Tag = **(0, 0, 1)**
- **Rule B:** `.price` -> 1 Class = **(0, 1, 0)**
- **Rule C:** `#main-price` -> 1 ID = **(1, 0, 0)**
- **Rule D:** `p.price` -> 1 Tag + 1 Class = **(0, 1, 1)**

### Trả lời các câu hỏi:

1. **Tính specificity score (a, b, c) cho mỗi rule:** (Đã liệt kê chi tiết ở ngay phía trên).

2. **Element sẽ có màu gì? Giải thích:**
   - Element hiển thị **màu đỏ (red)**.
   - **Giải thích:** Rule C có điểm số cao nhất `(1, 0, 0)` nhờ sử dụng ID selector `#main-price`. ID luôn có trọng số chiến thắng Class và Tag.

3. **Nếu thêm style="color: orange;" vào thẻ HTML, element có màu gì?**
   - Element chuyển sang **màu cam (orange)**.
   - **Giải thích:** Inline style (viết trực tiếp vào thuộc tính style của thẻ) có độ ưu tiên `(1, 0, 0, 0)`, luôn chiến thắng tất cả các selector thông thường được viết trong file CSS (kể cả ID).

4. **Nếu Rule A thêm !important, element có màu gì? Tại sao?**
   - Element chuyển sang **màu đen (black)**.
   - **Giải thích:** Từ khóa `!important` có quyền lực cao nhất, phá vỡ mọi quy tắc tính điểm thông thường. Nó đè lên cả ID lẫn Inline style.
   Hộp 1 (content-box): chiều rộng thực tế = 350 px (đo từ DevTools)
Hộp 2 (border-box): chiều rộng thực tế = 300 px (đo từ DevTools)

**Giải thích sự khác biệt:**
- Với `content-box` (Hộp 1), thuộc tính `width: 300px` chỉ gán cho vùng lõi content. Trình duyệt sẽ cộng thêm Padding (20px * 2) và Border (5px * 2) ra bên ngoài, khiến tổng chiều rộng phình to thành 350px.
- Với `border-box` (Hộp 2), thuộc tính `width: 300px` được ép cứng cho tổng kích thước hộp. Trình duyệt tự động bóp nhỏ vùng lõi content lại (còn 250px) để nhường chỗ cho Padding và Border, đảm bảo đúng kích thước thiết kế ban đầu là 300px.
## Câu C1 (10đ) — Debug CSS Layout

### 1. Tính chiều rộng thực tế của sidebar và content (content-box)
Công thức: Width + Padding Trái/Phải + Border Trái/Phải

- **Sidebar:** 300 + (20 * 2) + (1 * 2) = 300 + 40 + 2 = **342px**
- **Content:** 660 + (30 * 2) + (1 * 2) = 660 + 60 + 2 = **722px**

---

### 2. Giải thích tại sao layout bị vỡ
- **Tổng chiều rộng thực tế của 2 cột là:** 342 + 722 = **1064px**
- **Giải thích:** Do tổng chiều rộng thực tế (1064px) vượt quá giới hạn chiều rộng của thẻ `.container` (chỉ có 960px), nên không đủ không gian cho cả hai cột đứng cạnh nhau. Thuộc tính `float: left` sẽ tự động đẩy cột `.content` rớt xuống dòng mới.

---

### 3. Đưa ra 2 cách sửa khác nhau

#### Cách 1: Sử dụng border-box (Khuyên dùng)
Thêm thuộc tính `box-sizing: border-box;` vào cả `.sidebar` và `.content`. Khi đó, trình duyệt sẽ tự động bóp nhỏ phần lõi chữ để giữ cho tổng chiều rộng của hộp đúng bằng giá trị width ban đầu:
- Tổng chiều rộng mới = 300 + 660 = **960px** (Vừa khít 100% với container).

#### Cách 2: Giữ nguyên content-box, trừ bớt giá trị width ban đầu
Ta phải làm toán trừ thủ công phần padding (trái/phải) và border (trái/phải) ra khỏi thuộc tính width:
- Sửa `.sidebar` thành: `width: 258px;` (vì 258 + 40 + 2 = 300px)
- Sửa `.content` thành: `width: 598px;` (vì 598 + 60 + 2 = 660px)
Câu C2 (10đ) — Cascade Puzzle
Dưới đây là đáp án chính xác kèm theo cơ chế giải thích:

1. "Sản phẩm A" (h2)
font-size = 20px * Giải thích: Thẻ h2 kế thừa .card .title { font-size: 20px; }.

color = green * Giải thích: Có sự cạnh tranh giữa #featured .title (màu red - điểm 1,1,0) và .highlight (màu green - điểm 0,1,0). Dù ID có điểm cao hơn, nhưng rule .highlight có đính kèm !important nên giành chiến thắng tuyệt đối.

2. "Mô tả sản phẩm" (p trong card featured)
color = blue

Giải thích: Thẻ p có rule .card p { color: inherit; }. Từ khóa inherit bắt nó phải lấy chính xác màu của thẻ cha trực tiếp (thẻ <div class="card" id="featured">). Thẻ cha này đang chịu tác động của rule .card { color: blue; }, do đó thẻ p lấy màu xanh dương.

3. "Sản phẩm B" (h2)
font-size = 20px

Giải thích: Ăn theo rule .card .title.

color = blue

Giải thích: Thẻ h2 này chỉ có class .title (không có ID #featured cũng không có .highlight). Trong CSS không có rule nào định nghĩa màu riêng cho .title, nên nó tự động kế thừa (inheritance) màu text từ thẻ cha .card (màu blue).

4. "Mô tả sản phẩm B" (p.highlight)
color = green

Giải thích: Thẻ p này có class .highlight, khớp trực tiếp với rule .highlight { color: green !important; }. Thuộc tính gán trực tiếp luôn thắng thuộc tính kế thừa từ cha.