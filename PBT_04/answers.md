

## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí theo đâu? | Cuộn theo trang? | Use case thực tế |
| :--- | :--- | :--- | :--- | :--- |
| `static` | Có | Theo luồng tự nhiên của văn bản | Có | Là giá trị mặc định của mọi thẻ phần tử HTML. |
| `relative` | Có | Chính vị trí gốc ban đầu của nó | Có | Làm gốc tọa độ (gốc định vị) cho các thẻ con dùng absolute. |
| `absolute` | Không | Phần tử tổ tiên gần nhất có position khác static | Có | Tạo các thẻ thông báo (badge), tooltip, nút Close của pop-up. |
| `fixed` | Không | Khung nhìn của trình duyệt (Viewport) | Không | Thanh Navbar cố định trên cùng, nút "Quay lại đầu trang". |
| `sticky` | Có | Theo dòng chảy tự nhiên, sau đó dính theo cuộn ở mốc chỉ định | Có | Thanh tiêu đề của bảng (table header), Sidebar danh mục bài viết. |

**Câu hỏi thêm:**
1. **Khi nào `absolute` tham chiếu `body`?** Khi tất cả các thẻ cha chứa nó đều có thuộc tính `position: static` (mặc định) hoặc không khai báo thuộc tính `position`.
2. **Khi nào `absolute` tham chiếu `parent`?** Khi thẻ cha (hoặc tổ tiên gần nhất) được thiết lập thuộc tính `position` có giá trị khác `static` (ví dụ: `relative`, `absolute`, `fixed`).
3. **Giải thích khái niệm "nearest positioned ancestor":** Đây là phần tử tổ tiên gần nhất (có thể là cha, ông, cụ... bao bọc phần tử hiện tại) mà có thuộc tính `position` được định nghĩa khác với mặc định `static`.

---

### Câu A2 — Flexbox vs Grid

* **Trường hợp 1:**
  - **Bố cục:** 4 items xếp hàng ngang (1 hàng), chia đều chiều rộng bằng nhau (mỗi item chiếm đúng 25% chiều rộng container).
* **Trường hợp 2:**
  - **Bố cục:** Lưới gồm 3 hàng, mỗi hàng chứa đúng 2 items. Tổng cộng 6 items xếp thẳng đều nhau tăm tắp.
* **Trường hợp 3:**
  - **Bố cục:** 3 items nằm trên cùng 1 hàng ngang, căn giữa hoàn hảo theo chiều dọc. Item 1 sát lề trái, item 3 sát lề phải, item 2 ở chính giữa khoảng cách của hai item kia.
* **Trường hợp 4:**
  - **Bố cục:** 3 items chia làm 3 cột trên 1 hàng. Cột trái cố định `200px`, cột phải cố định `200px`, cột giữa chiếm toàn bộ không gian linh hoạt còn lại (`1fr`). Khoảng cách giữa các cột là `20px`.
* **Trường hợp 5:**
  - **Bố cục:** Lưới chia 3 cột bằng nhau, khoảng cách giữa các ô là `10px`. Với 7 items: Hàng 1 có 3 items, hàng 2 có 3 items, hàng 3 chỉ có 1 item duy nhất nằm ở cột đầu tiên bên trái (2 ô còn lại trống).

---

## PHẦN C — SUY LUẬN

### Câu C1 — Flexbox vs Grid: Khi nào dùng gì?

1. **Navigation bar ngang:** Dùng **Flexbox**. Vì đây là bố cục một chiều (1D), Flexbox giúp phân bổ khoảng cách giữa Logo, Menu và Button cực kỳ linh hoạt trên trục ngang.
2. **Lưới ảnh Instagram:** Dùng **Grid**. Vì đây là bố cục hai chiều cố định (2D) dạng lưới đồng đều hoàn hảo (3 cột), Grid tự động xếp các ảnh mới vào hàng tiếp theo mà không cần tính toán thủ công.
3. **Layout blog (main content + sidebar):** Dùng **Grid**. Grid rất phù hợp để phân chia cấu trúc tổng thể trang (layout xương sườn) thành các cột lớn rõ ràng.
4. **Footer với 4 cột thông tin:** Dùng **Grid**. Dùng Grid giúp chúng ta dễ dàng responsive chuyển thành 2 cột trên Tablet hoặc 1 cột trên Mobile bằng `grid-template-columns`.
5. **Card sản phẩm (ảnh trên, text giữa, nút luôn dính đáy):** Kết hợp cả hai. Dùng **Grid** cho lưới các card bên ngoài, và dùng **Flexbox** (`flex-direction: column`) cho nội dung bên trong từng chiếc card để đẩy nút bám sát đáy một cách dễ dàng với `margin-top: auto`.

---

### Câu C2 — Debug Flexbox

#### Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
- **Nguyên nhân:** Các card có lượng văn bản dài ngắn khác nhau, khiến chiều cao tự thân biến động. Do bản thân thẻ `.card` chưa được kích hoạt Flexbox nên nội dung bên trong trôi tự do, nút không bám đáy.
- **Cách sửa:** Biến `.card` thành một flex container theo chiều dọc, sau đó đẩy nút lên bằng `margin-top: auto`.
```css
.card {
  display: flex;
  flex-direction: column;
}
.card .btn {
  margin-top: auto;
}