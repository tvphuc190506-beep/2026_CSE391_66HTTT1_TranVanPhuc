## PHẦN A — ĐỌC HIỂU

### Câu A1 — Closure Basics

* **Đoạn 1: Dự đoán kết quả in ra Console:**
  - `console.log(c.increment());` // Kết quả: 1
  - `console.log(c.increment());` // Kết quả: 2
  - `console.log(c.increment());` // Kết quả: 3
  - `console.log(c.decrement());` // Kết quả: 2
  - `console.log(c.getCount());`  // Kết quả: 2

* **Đoạn 2: Kết quả sau 200ms:**
  - Vòng lặp var in ra: `var: 3`, `var: 3`, `var: 3`
  - Vòng lặp let in ra: `let: 0`, `let: 1`, `let: 2`

* **Giải thích chi tiết tại sao `var` và `let` cho kết quả khác nhau:**
- Biến khai báo bằng từ khóa `var` không có phạm vi khối (Block Scope) mà ăn theo Function/Global Scope.
- Do đó, cả 3 hàm callback trong `setTimeout` đều tham chiếu chung đến một biến `i` duy nhất.
- Khi vòng lặp kết thúc, giá trị của biến `i` đã tăng lên bằng `3`, dẫn đến cả 3 lần in đều ra `3`.
- Biến khai báo bằng từ khóa `let` có phạm vi khối (Block Scope).
- Tại mỗi lượt chạy của vòng lặp, một biến `j` mới hoàn toàn sẽ được tạo ra và cô lập trong block đó.
- Nhờ cơ chế Closure, các hàm callback giữ được tham chiếu đến đúng giá trị `j` riêng biệt tại lượt chạy đó.

---

### Câu A2 — Array Methods (Yêu cầu viết đúng 1 dòng code sử dụng Arrow function)

Cho mảng: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];`

1. **Lấy các số chẵn:**
```javascript
const cau1 = nums.filter(x => x % 2 === 0);
Nhân mỗi số với 3:

JavaScript
const cau2 = nums.map(x => x * 3);
Tính tổng tất cả:

JavaScript
const cau3 = nums.reduce((sum, x) => sum + x, 0);
Tìm số đầu tiên > 7:

JavaScript
const cau4 = nums.find(x => x > 7);
Kiểm tra CÓ số nào > 10 không:

JavaScript
const cau5 = nums.some(x => x > 10);
Kiểm tra TẤT CẢ đều > 0:

JavaScript
const cau6 = nums.every(x => x > 0);
Tạo mảng "Số X là [chẵn/lẻ]":

JavaScript
const cau7 = nums.map(x => `Số ${x} là ${x % 2 === 0 ? "chẵn" : "lẻ"}`);
Đảo ngược mảng (Không mutate gốc):

JavaScript
const cau8 = [...nums].reverse();
Câu A3 — Object Destructuring & Spread
Dự đoán kết quả phần Destructuring:

console.log(name, price, ram, color);
=> Kết quả: iPhone 16 | 25990000 | 8 | Titan

console.log(specs);
=> Kết quả: { ram: 8, storage: 256, color: 'Titan' } ( specs vẫn chứa đủ thuộc tính )

Dự đoán kết quả phần Spread:

console.log(updated.price); // Kết quả: 23990000 (Giá trị mới đã đè lên giá trị cũ)

console.log(updated.sale);  // Kết quả: true (Thuộc tính mới được thêm vào)

console.log(product.price); // Kết quả: 25990000 (Đối tượng product gốc không bị thay đổi)

Dự đoán kết quả phần Spread gotcha:

console.log(product.specs.ram); => Kết quả là: 16

Tại sao? Vì cú pháp Spread { ...product } chỉ thực hiện sao chép nông (Shallow Copy).

Nó chỉ copy các thuộc tính ở tầng bề mặt, còn đối tượng con lồng bên trong là .specs
thì cả biến copy và product gốc vẫn trỏ chung vào cùng một vùng nhớ trong bộ nhớ RAM.

Do đó, khi ta thay đổi copy.specs.ram = 16 thì giá trị ở product gốc cũng bị đổi theo.

PHẦN C — PHÂN TÍCH
Câu C1 — Refactor Code
Đoạn mã sau khi được tối ưu hóa ngắn gọn, loại bỏ hoàn toàn các vòng lặp for lồng nhau lộn xộn:

JavaScript
const processOrders = orders => orders
    .filter(o => o.status === "completed" && o.total > 100000)
    .map(({ id, customer, total }) => ({ id, customer, total, discount: total * 0.1, finalTotal: total * 0.9 }))
    .sort((a, b) => b.finalTotal - a.finalTotal);
Câu C2 — Thiết kế API (So sánh Closure với Global Variable)
Nếu sử dụng biến toàn cục let items = []; thì sao?

Hệ thống vẫn chạy được nhưng mã nguồn cực kỳ lỏng lẻo và mất an toàn dữ liệu.

Bất kỳ đoạn mã code nào khác nằm ở bên ngoài file đều có quyền truy cập trực tiếp để sửa đổi,
xóa sạch mảng items hoặc chèn dữ liệu rác vào mà không thông qua các phương thức kiểm tra của Cart.

Tại sao cấu trúc Closure lại tốt hơn?

Vì biến let items = []; được khai báo ẩn bên trong hàm cha createCart().

Biến này đóng vai trò như một thuộc tính riêng tư (Private variable) được bao bọc kín kẽ.

Bên ngoài không có cách nào can thiệp trực tiếp vào mảng được,
mà bắt buộc phải giao tiếp thông qua các cổng phương thức an toàn được cấp phép trả về (như .addItem(), .removeItem()).