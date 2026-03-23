const inputFild = document.querySelector("#todo-input");
const addBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");

addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deletecheck);
document.addEventListener("DOMContentLoaded", loadTodos);

function addTodo(event) {
    event.preventDefault();
    
    const todoText = inputFild.value.trim();
    
    if (todoText === "") {
        alert("Please enter a task!");
        return;
    }
    
    const todoObject = { text: todoText, completed: false };
    
    savelocal(todoObject);
    renderToDo(todoObject);
    
    inputFild.value = "";
}

function renderToDo(todo) {
const li=document.createElement("li");
li.innerHTML = `
        <span class="todo-item">${todo.text}</span>
        <div class="todo-actions">
            <button class="complete-btn">✓</button>
            <button class="delete-btn">✗</button>
        </div>
    `;


if(todo.completed){
    li.classList.add("completed");
}

todoList.appendChild(li);
}

function savelocal(todo) {
    let todos=localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function deletecheck(event) {
    const item = event.target;
    
    if (item.classList.contains('delete-btn')) {
        const todo = item.parentElement.parentElement;
        todo.classList.add('fall'); // Optional: add animation class
        
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
        
        removeLocalTodos(todo);
    }
    
    if (item.classList.contains('complete-btn')) {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle('completed');
        updateLocalTodos(todo);
    }
}
function removeLocalTodos(todo) {
    let todos = localStorage.getItem('todos') 
        ? JSON.parse(localStorage.getItem('todos')) 
        : [];
    
    const todoText = todo.querySelector('.todo-item').innerText;
    todos = todos.filter(t => t.text !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateLocalTodos(todo) {
    let todos = localStorage.getItem('todos') 
        ? JSON.parse(localStorage.getItem('todos')) 
        : [];
    
    const todoText = todo.querySelector('.todo-item').innerText;
    const todoIndex = todos.findIndex(t => t.text === todoText);
    
    if (todoIndex !== -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

function loadTodos() {
    let todos = localStorage.getItem('todos') 
        ? JSON.parse(localStorage.getItem('todos')) 
        : [];
    
    todos.forEach(function(todo) {
        renderToDo(todo);
    });
}