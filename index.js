const todos = JSON.parse(localStorage.getItem('todos')) || [];

document.getElementById('addTodo').addEventListener('click', addTodo);

function addTodo() {
    const todo = document.getElementById('todo').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!todo || !description) {
        alert('Please fill in both fields.');
        clearInputs();
        return;
    }

    const todoObject = {
        id: Date.now(),
        todo: todo,
        description: description,
        completed: false
    };

    todos.push(todoObject);
    localStorage.setItem('todos', JSON.stringify(todos));

    addTodoToDOM(todoObject);
    clearInputs();
}

function addTodoToDOM(todoObject) {
    const todoContainer = document.getElementById('todoContainer');
    const noTodo = document.getElementById('noTodo');

    if (noTodo) noTodo.remove();

    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo_item';
    todoDiv.id = `todo-${todoObject.id}`;

    const todoTitle = document.createElement('div');
    todoTitle.className = 'todo_item_todo';
    todoTitle.textContent = "Task : "+todoObject.todo;

    const todoDescription = document.createElement('div');
    todoDescription.className = 'todo_item_description';
    todoDescription.textContent = "Description : " + todoObject.description;

    const completeDiv = document.createElement('div');
    completeDiv.className = 'completeButton';
    completeDiv.textContent = todoObject.completed ? 'Completed' : 'Mark as Complete';
    completeDiv.style.cursor = todoObject.completed ? 'not-allowed' : 'pointer';
    completeDiv.style.opacity = todoObject.completed ? '0.6' : '1';
    completeDiv.addEventListener('click', () => markAsComplete(todoObject.id, completeDiv, todoDiv, todoTitle, todoDescription));

    const deleteDiv = document.createElement('div');
    deleteDiv.className = 'deleteButton';
    deleteDiv.textContent = 'Delete Todo';
    deleteDiv.addEventListener('click', () => deleteTodo(todoObject.id, todoDiv));

    if(completeDiv.textContent === 'Completed') {
        todoDiv.style.backgroundColor = "#005d05"; ;
        completeDiv.style.cursor = 'not-allowed';
        completeDiv.style.opacity = '0.8';
        todoTitle.style.backgroundColor = "#005d05";
        todoDescription.style.backgroundColor = "#005d05";
    }

    todoDiv.appendChild(todoTitle);
    todoDiv.appendChild(todoDescription);
    todoDiv.appendChild(completeDiv);
    todoDiv.appendChild(deleteDiv);

    todoContainer.appendChild(todoDiv);
}

function markAsComplete(todoId, completeDiv, todoDiv, todoTitle, todoDescription) {
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    if (todoIndex !== -1) {
        todos[todoIndex].completed = true;
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    todoDiv.style.backgroundColor = '#005d05';
    completeDiv.textContent = 'Completed';
    completeDiv.style.cursor = 'not-allowed';
    completeDiv.style.opacity = '0.8';
    todoTitle.style.backgroundColor = "#005d05";
    todoDescription.style.backgroundColor = "#005d05";
}

function deleteTodo(todoId, todoDiv) {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    todos.length = 0; 
    todos.push(...updatedTodos);
    localStorage.setItem('todos', JSON.stringify(todos));

    todoDiv.remove();

    if (updatedTodos.length === 0) {
        showEmptyMessage();
    }
}

function showEmptyMessage() {
    const todoContainer = document.getElementById('todoContainer');
    const noTodo = document.createElement('div');
    noTodo.id = 'noTodo';
    noTodo.textContent = 'your list is empty...';
    todoContainer.appendChild(noTodo);
}

function clearInputs() {
    document.getElementById('todo').value = '';
    document.getElementById('description').value = '';
}

window.onload = function () {
    if (todos.length === 0) {
        showEmptyMessage();
    } else {
        todos.forEach(addTodoToDOM);
    }
};
