const btnOpenForm = document.getElementById('btn-open-form');
const btnCloseForm = document.getElementById('btn-close-form');
const formPopup = document.getElementById('form-popup');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const messageDiv = document.getElementById('message');

// Lấy dữ liệu từ LocalStorage khi tải trang
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Hàm hiển thị danh sách công việc
function renderTasks() {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        return; // Nếu không có dữ liệu thì để trống khu vực danh sách
    }

    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-item ${task.completed ? 'completed' : ''}`;
        div.innerHTML = `
            <h3>${task.title} <span style="font-size: 12px; background: #e9ecef; padding: 3px 8px; border-radius: 4px; color: #495057; font-weight: normal; margin-left: 5px;">Ưu tiên: ${task.priority}</span></h3>
            <p>${task.desc}</p>
            <p><strong>Hạn:</strong> ${task.date}</p>
            <div class="task-actions">
                <label style="display:flex; align-items:center; gap:5px; cursor:pointer; font-size: 14px; font-weight: bold; color: #007bff;">
                    <input type="checkbox" onchange="toggleStatus(${task.id})" ${task.completed ? 'checked' : ''}> Đã hoàn thành
                </label>
                <button class="btn btn-secondary" style="padding: 6px 12px; margin-left: auto;" onclick="editTask(${task.id})">Sửa</button>
                <button class="btn btn-secondary" style="background:#dc3545; padding: 6px 12px;" onclick="deleteTask(${task.id})">Xóa</button>
            </div>
        `;
        taskList.appendChild(div);
    });
    
    updateTaskSummary();
}

// Hàm lưu dữ liệu
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Hàm hiển thị thông báo
function showMessage(msg) {
    messageDiv.textContent = msg;
    messageDiv.classList.remove('hidden');
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 3000);
}

// Hàm cập nhật thống kê
function updateTaskSummary() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    document.getElementById('total-tasks').textContent = total;
    document.getElementById('completed-tasks').textContent = completed;
    document.getElementById('pending-tasks').textContent = total - completed;
}

// Sự kiện mở form
btnOpenForm.addEventListener('click', () => {
    taskForm.reset();
    document.getElementById('task-id').value = '';
    formPopup.classList.remove('hidden');
});

// Sự kiện đóng form
btnCloseForm.addEventListener('click', () => {
    formPopup.classList.add('hidden');
});

// Sự kiện submit lưu công việc
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const idInput = document.getElementById('task-id').value;
    const title = document.getElementById('title').value.trim();
    const desc = document.getElementById('desc').value.trim();
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;

    if (!title || !desc || !date) {
        alert('Vui lòng điền đầy đủ các trường bắt buộc!');
        return;
    }

    if (idInput) {
        const index = tasks.findIndex(t => t.id == idInput);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], title, desc, date, priority };
            showMessage('Cập nhật công việc thành công!');
        }
    } else {
        const newTask = {
            id: Date.now(),
            title, 
            desc, 
            date, 
            priority,
            completed: false
        };
        tasks.push(newTask);
        showMessage('Thêm công việc thành công!');
    }

    saveTasks();
    renderTasks();
    formPopup.classList.add('hidden');
});

// Hàm xóa công việc
window.deleteTask = function(id) {
    if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        updateTaskSummary(); // Cập nhật lại số 0 nếu xóa hết
        showMessage('Đã xóa công việc!');
    }
}

// Hàm lấy dữ liệu lên form để sửa
window.editTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        document.getElementById('task-id').value = task.id;
        document.getElementById('title').value = task.title;
        document.getElementById('desc').value = task.desc;
        document.getElementById('date').value = task.date;
        document.getElementById('priority').value = task.priority;
        formPopup.classList.remove('hidden');
    }
}

// Hàm đổi trạng thái hoàn thành
window.toggleStatus = function(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Khởi tạo hiển thị lần đầu
renderTasks();
updateTaskSummary();