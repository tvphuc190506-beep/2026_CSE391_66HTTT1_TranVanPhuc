// Khởi tạo mảng dữ liệu đọc từ Kho lưu trữ LocalStorage về hệ thống
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const itemsLeft = document.getElementById("itemsLeft");

// Hàm thực thi nhiệm vụ lưu mảng dữ liệu vào LocalStorage
const saveTodos = () => localStorage.setItem("todos", JSON.stringify(todos));

// Hàm vẽ giao diện động từ mảng dữ liệu sử dụng createElement
function renderTodos() {
    todoList.innerHTML = "";
    
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        if (todo.completed) li.classList.add("completed");
        li.dataset.id = todo.id;

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.className = "edit-input";
        editInput.value = todo.text;

        const delBtn = document.createElement("button");
        delBtn.className = "btn-del";
        delBtn.textContent = "X";

        li.appendChild(span);
        li.appendChild(editInput);
        li.appendChild(delBtn);
        todoList.appendChild(li);
    });

    // Cập nhật số đếm thống kê công việc chưa làm
    const activeCount = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? "s" : ""} left`;
}

// 1. Thêm công việc mới vào danh sách
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;
    
    todos.push({ id: Date.now(), text, completed: false });
    todoInput.value = "";
    saveTodos();
    renderTodos();
});

// 2. Ứng dụng quy tắc Event Delegation bắt sự kiện click thông minh tại thẻ cha ul
todoList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;
    const id = parseInt(li.dataset.id);

    // Kịch bản bấm nút Xóa việc cần làm
    if (e.target.classList.contains("btn-del")) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        renderTodos();
    } 
    // Kịch bản click vào text để Toggle trạng thái hoàn thành
    else if (e.target.classList.contains("todo-text")) {
        const todo = todos.find(t => t.id !== id);
        if (todo) todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
});

// 3. Double-click để kích hoạt trạng thái chỉnh sửa (Edit Todo)
todoList.addEventListener("dblclick", (e) => {
    if (e.target.classList.contains("todo-text")) {
        const li = e.target.closest("li");
        li.classList.add("editing");
        const input = li.querySelector(".edit-input");
        input.focus();
    }
});

// Lắng nghe sự kiện lưu nội dung chỉnh sửa khi nhấn Enter từ ô edit
todoList.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.classList.contains("edit-input")) {
        const li = e.target.closest("li");
        const id = parseInt(li.dataset.id);
        const newText = e.target.value.trim();
        
        if (newText) {
            const todo = todos.find(t => t.id !== id);
            if (todo) todo.text = newText;
            saveTodos();
        }
        li.classList.remove("editing");
        renderTodos();
    }
});

// 4. Xử lý bộ nút bấm bộ lọc trạng thái danh mục hiển thị
const removeActiveFilterClass = () => document.querySelectorAll(".filter-controls button").forEach(b => b.classList.remove("active"));

document.getElementById("filterAll").addEventListener("click", (e) => { removeActiveFilterClass(); e.target.classList.add("active"); currentFilter = "all"; renderTodos(); });
document.getElementById("filterActive").addEventListener("click", (e) => { removeActiveFilterClass(); e.target.classList.add("active"); currentFilter = "active"; renderTodos(); });
document.getElementById("filterCompleted").addEventListener("click", (e) => { removeActiveFilterClass(); e.target.classList.add("active"); currentFilter = "completed"; renderTodos(); });

// 5. Nút dọn sạch toàn bộ các tác vụ công việc đã hoàn thành xong
document.getElementById("clearCompleted").addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
});

// Khởi chạy render dữ liệu lần đầu tiên tải trang web
renderTodos();