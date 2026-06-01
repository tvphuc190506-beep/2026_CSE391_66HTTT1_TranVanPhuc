## PHẦN A — KIỂM TRA ĐỌC HIỂU

### Câu A1 — DOM Tree

1. **Sơ đồ cây DOM Tree biểu diễn phân cấp hệ thống:**
```text
document
└── div#app
    ├── header
    │   ├── h1
    │   └── nav
    │       ├── a.active
    │       ├── a
    │       └── a
    └── main
        ├── form#todoForm
        │   ├── input#todoInput
        │   └── button
        └── ul#todoList
            ├── li.todo-item
            └── li.todo-item.completed
Mã lệnh querySelectorAll / querySelector theo yêu cầu:

Chọn thẻ <h1>:
document.querySelector("h1");

Chọn input trong form:
document.querySelector("#todoForm input");

Chọn tất cả .todo-item:
document.querySelectorAll(".todo-item");

Chọn link đang active:
document.querySelector("nav a.active");

Chọn <li> đầu tiên trong #todoList:
document.querySelector("#todoList li:first-child");

Chọn tất cả <a> bên trong <nav>:
document.querySelectorAll("nav a");

Câu A2 — innerHTML vs textContent
Giải thích sự khác nhau:

innerHTML: Trả về hoặc thay đổi toàn bộ nội dung văn bản bao gồm cả các thẻ tag HTML bên trong phần tử. Khi gán giá trị, trình duyệt sẽ phân tích cú pháp chuỗi thành các thẻ HTML thật.

textContent: Chỉ trả về hoặc thay đổi nội dung văn bản thuần túy (plain text) bên trong phần tử, tự động loại bỏ hoặc mã hóa tất cả các thẻ tag HTML thành chuỗi ký tự thô.

Ví dụ khi nào dùng mỗi cái:

Dùng innerHTML khi bạn thực sự muốn chèn một đoạn cấu trúc HTML mới động vào giao diện (ví dụ: Tạo nhanh một cấu trúc thẻ card sản phẩm phức tạp).

Dùng textContent khi bạn chỉ muốn cập nhật dữ liệu chữ đơn thuần (như điểm số, tên người dùng, nội dung lời nhắn) để đảm bảo tốc độ render nhanh và an toàn.

Câu hỏi bảo mật: Tại sao innerHTML gây lỗ hổng XSS?

Vì nếu bạn nhận chuỗi nhập vào trực tiếp từ người dùng (userInput) rồi gán thẳng vào innerHTML, kẻ tấn công có thể cố tình nhập vào các thẻ độc hại như <img src=x onerror="alert('Hacked!')"> hoặc <script>. Trình duyệt sẽ thực thi đoạn mã độc này ngay lập tức.

Cách sửa: Thay thế việc dùng innerHTML bằng thuộc tính textContent để trình duyệt chỉ hiểu đoạn mã độc đó là một chuỗi chữ thô vô hại.

Câu A3 — Event Bubbling
Dự đoán thứ tự log ra Console khi click vào nút #btn:

Plaintext
BUTTON
INNER
OUTER
Nếu uncomment dòng lệnh e.stopPropagation();:

Kết quả in ra Console lúc này chỉ hiển thị một dòng duy nhất: BUTTON

Giải thích: Hàm stopPropagation() làm nhiệm vụ chặn đứng dòng chảy sự kiện, không cho sự kiện click lan truyền ngược lên các thẻ cha bao bọc phía trên nó (ngắt cơ chế Bubbling).

PHẦN C — DEBUG & PHÂN TÍCH
Câu C1 — Debug DOM Code
Danh sách 7 lỗi tìm thấy trong đoạn mã và cách sửa chính xác:

Lỗi 1 (Dòng 1 chọn Display): Lớp count dùng .count trong khi đúng chuẩn giao diện là #countDisplay hoặc thẻ hiển thị số.

-> Sửa: Đổi thành bộ chọn chuẩn xác của element.

Lỗi 2 (Dòng gán sự kiện Decrement): Sử dụng sai tên chuỗi sự kiện "onclick" trong hàm lắng nghe.

-> Sửa: Đổi tên chuỗi sự kiện về chuẩn thế hệ mới là "click".

Lỗi 3 (Dòng cập nhật số lượng Decrement): Sử dụng thuộc tính innerHTML viết hoa sai ngữ pháp innerHTML = count.

-> Sửa: Thay thế bằng thuộc tính text thuần an toàn textContent = count;.

Lỗi 4 (Dòng dọn dẹp reset): Gán giá trị dọn dẹp lịch sử thành null làm lỗi giao diện HTML.

-> Sửa: Đổi thành chuỗi rỗng historyList.textContent = "";.

Lỗi 5 (Hàm deleteHistory): Sử dụng phương thức xóa cổ điển lỗi thời parentNode.removeChild().

-> Sửa: Sử dụng phương thức hiện đại ngắn gọn trực tiếp: element.remove();.

Lỗi 6 (Hàm Clear All): Lỗi logic gán trình lắng nghe click lặp lại không hoạt động.

-> Sửa: Viết cấu trúc lặp xóa mảng đồng bộ, dùng historyList.innerHTML = "" để dọn sạch.

Lỗi 7 (Hàm Load LocalStorage): Khi đọc dữ liệu từ kho lưu trữ về chưa cập nhật lại giá trị cho biến trạng thái toàn cục count.

-> Sửa: Bổ sung ép kiểu số count = parseInt(localStorage.getItem("count")) || 0;.

Câu C2 — Phân tích kỹ thuật tối ưu hóa Reflow
Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?

Gây ngốn một lượng lớn tài nguyên bộ nhớ RAM của trình duyệt để lưu trữ 1000 bộ lắng nghe.

Làm giảm hiệu năng xử lý của trang web một cách rõ rệt.

Khi có các thẻ phần tử mới được thêm động vào giao diện, chúng sẽ không tự động có sự kiện, mất công bind lại.

Event Delegation giải quyết thế nào?

Cơ chế này lợi dụng hiện tượng nổi bọt sự kiện (Event Bubbling).

Ta chỉ cần gán duy nhất 1 bộ lắng nghe sự kiện lên thẻ cha bao bọc ngoài cùng (ví dụ thẻ #todoList).

Khi click vào bất kỳ thẻ con nào, sự kiện nổi bọt lên cha, ta chỉ cần dùng e.target để kiểm tra chính xác thẻ con nào vừa kích hoạt để xử lý.

Đoạn code Refactor sử dụng DocumentFragment tối ưu giảm Reflow:

JavaScript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div); // Chỉ ghi nhận trong bộ nhớ tạm, chưa gây Reflow
}
document.body.appendChild(fragment); // Gây ra duy nhất đúng 1 lần Reflow toàn trang