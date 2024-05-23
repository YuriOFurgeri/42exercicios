$(document).ready(function() {
    const taskList = $('#ft_list');
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
        taskList.empty(); // Limpa a lista antes de renderizar as tarefas
        tasks.forEach(task => addTaskToDOM(task));
    };

    const addTaskToDOM = (taskText) => {
        const li = $('<li>').addClass('task-item').text(taskText);
        taskList.append(li);
        addTaskItemListeners(li);
    };

    const addTaskItemListeners = (li) => {
        li.on('click', (event) => {
            const confirmDelete = confirm("Você deseja excluir esta tarefa?");
            if (confirmDelete) {
                const index = tasks.indexOf(li.text());
                tasks.splice(index, 1);
                li.remove();
                saveTasksToLocalStorage();
            }
        });
    };

    loadTasksFromLocalStorage();

    $('#botaoadd').click(() => {
        const taskText = prompt("Por favor, insira a nova tarefa:");
        if (taskText && taskText.trim() !== '') {
            tasks.push(taskText.trim());
            addTaskToDOM(taskText.trim());
            saveTasksToLocalStorage();
        }
    });
});