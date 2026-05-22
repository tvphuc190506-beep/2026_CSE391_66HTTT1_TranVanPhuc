const btnOpenForm = document.getElementById('btn-open-form');
const btnCloseForm = document.getElementById('btn-close-form');
const formPopup = document.getElementById('form-popup');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const messageDiv = document.getElementById('message');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<p>Chưa có dữ liệu công việc.</p>';
        return;
    }

    tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-item ${task.completed ? 'completed' : ''}`;
        div.innerHTML = `
            <h3>${task.title} - ${task.priority}</h3>
            <p>${task.desc}</p>
            <p>Hạn: ${task.date}</p>
            <input type="checkbox" onchange="toggleStatus(${task.id})" ${task.completed ? 'checked' : ''}> Hoàn thành
            <button onclick="editTask(${task.id})">Sửa</button>
            <button onclick="deleteTask(${task.id})">Xóa</button>
        `;
        taskList.appendChild(div);
    });
    
    updateTaskSummary();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showMessage(msg) {
    messageDiv.textContent = msg;
    messageDiv.classList.remove('hidden');
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 3000);
}

function updateTaskSummary() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    document.getElementById('total-tasks').textContent = total;
    document.getElementById('completed-tasks').textContent = completed;
    document.getElementById('pending-tasks').textContent = total - completed;
}

btnOpenForm.addEventListener('click', () => {
    taskForm.reset();
    document.getElementById('task-id').value = '';
    formPopup.classList.remove('hidden');
});

btnCloseForm.addEventListener('click', () => {
    formPopup.classList.add('hidden');
});

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

function deleteTask(id) {
    if (confirm('Bạn có chắc chắn muốn xóa công việc này?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
        showMessage('Đã xóa công việc!');
    }
}

function editTask(id) {
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

function toggleStatus(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

renderTasks();