* **Dự đoán kết quả (Output):**
  - **Đoạn 1:** `undefined` (Do cơ chế Hoisting của từ khóa `var`).
  - **Đoạn 2:** Lỗi `ReferenceError` (Do biến `let` nằm trong vùng chết tạm thời TDZ).
  - **Đoạn 3:** Lỗi `TypeError` (Do cố tình gán lại giá trị mới cho hằng số `const`).
  - **Đoạn 4:** `[1, 2, 3, 4]` (Hợp lệ vì không gán lại mảng mới mà chỉ thêm phần tử vào mảng).
  - **Đoạn 5:** - `Trong block: 2`
    - `Ngoài block: 1`

---

### Câu A2 — Data Types & Coercion

* **Dự đoán kết quả chạy các lệnh:**
  - `console.log(typeof null);`        // "object" (Lỗi lịch sử của ngôn ngữ JS)
  - `console.log(typeof undefined);`   // "undefined"
  - `console.log(typeof NaN);`         // "number"
  - `console.log("5" + 3);`            // "53" (Ép kiểu chuỗi: nối chuỗi)
  - `console.log("5" - 3);`            // 2 (Ép kiểu số: thực hiện phép toán trừ)
  - `console.log("5" * "3");`          // 15 (Ép kiểu số: thực hiện phép toán nhân)
  - `console.log(true + true);`        // 2 (Do true được chuyển đổi số thành 1)
  - `console.log([] + []);`            // "" (Chuỗi rỗng)
  - `console.log([] + {});`            // "[object Object]"
  - `console.log({} + []);`            // "[object Object]"

* **Giải thích tại sao `"5" + 3` và `"5" - 3` cho kết quả khác nhau:**
  - Với toán tử cộng `+`, JavaScript ưu tiên xử lý nối chuỗi nếu có một vế là String.
  - Do đó số `3` bị ép kiểu sang chuỗi `"3"` và ghép nối tạo thành kết quả `"53"`.
  - Với toán tử trừ `-`, bản chất phép toán này không tồn tại trong xử lý chuỗi.
  - Do đó JavaScript ép chuỗi `"5"` về dạng số nguyên `5` để trừ đi `3`, cho ra kết quả bằng `2`.

---

### Câu A3 — So sánh == vs ===

* **Dự đoán kết quả (true / false):**
  - `5 == "5"`           // true (Chỉ so sánh giá trị sau khi tự ép kiểu)
  - `5 === "5"`          // false (So sánh nghiêm ngặt cả giá trị và kiểu dữ liệu)
  - `null == undefined`  // true (Quy ước đặc biệt trong JavaScript)
  - `null === undefined` // false (Khác biệt hoàn toàn về kiểu dữ liệu)
  - `NaN == NaN`         // false (NaN không bao giờ bằng chính nó)
  - `0 == false`         // true (Do số 0 tự ép kiểu về giá trị falsy)
  - `0 === false`        // false (Khác kiểu dữ liệu: Number và Boolean)
  - `"" == false`        // true (Do chuỗi rỗng tự ép kiểu về giá trị falsy)

* **Quy tắc:** Từ giờ trở đi, bạn **NÊN DÙNG toán tử `===`**.
* **Tại sao?** Vì toán tử `===` kiểm tra nghiêm ngặt cả kiểu dữ liệu và giá trị.
- Giúp chương trình chạy chính xác, tránh được các lỗi logic ẩn.
- Không lo hành vi tự động ép kiểu ngầm đầy rủi ro của toán tử `==`.

---

### Câu A4 — Truthy & Falsy

* **TẤT CẢ các giá trị Falsy trong JavaScript bao gồm:**
  - `false`, `0`, `-0`, `0n` (BigInt), `""` (chuỗi rỗng), `null`, `undefined`, và `NaN`.

* **Dự đoán kết quả in ấn:**
  - `if ("0")`   => **In ra "A"** (Vì chuỗi `"0"` có độ dài > 0, là một giá trị Truthy).
  - `if ("")`    => **Không in** (Chuỗi rỗng là Falsy).
  - `if ([])`    => **In ra "C"** (Mảng rỗng trong JavaScript luôn là Truthy).
  - `if ({})`    => **In ra "D"** (Đối tượng rỗng luôn là Truthy).
  - `if (null)`  => **Không in** (null là Falsy).
  - `if (0)`     => **Không in** (số 0 là Falsy).
  - `if (-1)`    => **In ra "G"** (Bất kỳ số nào khác 0 đều là Truthy).
  - `if (" ")`   => **In ra "H"** (Chuỗi có chứa dấu cách không phải rỗng, là Truthy).

---

## PHẦN C — SUY LUẬN

### Câu C1 — Debug JavaScript

* **Danh sách 6 lỗi tìm thấy và cách sửa:**
1. **Lỗi 1 (Dòng truyền tham số test):** Truyền `"100000"` dạng chuỗi String.  
   -> *Sửa:* Đổi thành dạng số nguyên `100000` không có dấu ngoặc kép.
2. **Lỗi 2 (Dòng kiểm tra free):** Sử dụng phép gán `=` trong lệnh `if (giaSauGiam = 0)`.  
   -> *Sửa:* Đổi thành so sánh nghiêm ngặt `if (giaSauGiam === 0)`.
3. **Lỗi 3 (Dòng gọi hàm vòng lặp):** Vòng lặp khai báo `var i = 0` kết hợp `setTimeout`.  
   -> *Sửa:* Đổi `var i` thành `let i` để tạo Scope riêng biệt cho từng vòng lặp.
4. **Lỗi 4 (Dòng in ra màn hình ở phần test 2):** Phép nối chuỗi `console.log("Giá: " + gia2)` thiếu dấu đóng ngoặc tròn.  
   -> *Sửa:* Thêm dấu đóng ngoặc tròn `)` vào cuối câu lệnh.
5. **Lỗi 5 (Dòng logic giảm giá):** Hàm kiểm tra phần trăm giảm lớn hơn 100 nhưng phần test truyền giá trị `110`.  
   -> *Sửa:* Chỉnh lại logic hệ thống hoặc giá trị tham số truyền vào nhỏ hơn 100.
6. **Lỗi 6 (Dòng trả về kết quả):** Câu lệnh `return giaSauGiam` thiếu dấu chấm phẩy và sai tên biến cục bộ.  
   -> *Sửa:* Viết chuẩn xác là `return giaSauGiam;`.