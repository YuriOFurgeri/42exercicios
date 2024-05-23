document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('botaoadd');
    const taskList = document.getElementById('ft_list');
    let tasks = [];

    const loadTasksFromLocalStorage = () => {
        const tasksString = localStorage.getItem('tasks');
        if (tasksString) {
            tasks = JSON.parse(tasksString);
            renderTasks();
        }
    };

    const saveTasksToLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = ''; // Limpa a lista antes de renderizar as tarefas
        tasks.forEach(task => addTaskToDOM(task));
    };

    const addTaskToDOM = (taskText) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.textContent = taskText;
        taskList.appendChild(li);
        addTaskItemListeners(li);
    };

    const addTaskItemListeners = (li) => {
        li.onclick = (event) => {
            const confirmDelete = confirm("Você deseja excluir esta tarefa?");
            if (confirmDelete) {
                const index = tasks.indexOf(li.textContent);
                tasks.splice(index, 1);
                taskList.removeChild(li);
                saveTasksToLocalStorage();
            }
        };
    };

    loadTasksFromLocalStorage();

    addTaskBtn.onclick = () => {
        const taskText = prompt("Por favor, insira a nova tarefa:");
        if (taskText && taskText.trim() !== '') {
            tasks.push(taskText.trim());
            addTaskToDOM(taskText.trim());
            saveTasksToLocalStorage();
        }
    };
});
