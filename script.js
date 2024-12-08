document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-btn");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const progressBar = document.getElementById("progress-bar");

    function updateProgressBar() {
        const todos = document.querySelectorAll(".todo");
        const completedTodos = document.querySelectorAll(".todo input[type='checkbox']:checked");
        const progress = todos.length > 0 ? (completedTodos.length / todos.length) * 100 : 0;

        progressBar.style.width = `${progress}%`;

        if (progress === 100 && todos.length > 0) {
            progressBar.textContent = "ALL DONE!";
        } else {
            progressBar.textContent = `${Math.round(progress)}%`;
        }
    }

    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();

        if (todoText === "") return;

        const todoItem = document.createElement("li");
        todoItem.classList.add("todo");

        todoItem.innerHTML = `
            <input type="checkbox">
            <label class="todo-text">${todoText}</label>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        todoList.appendChild(todoItem);
        todoInput.value = "";

        updateProgressBar();
    });

    todoList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            e.target.closest(".todo").remove();
            updateProgressBar();
        } else if (e.target.classList.contains("edit-btn")) {
            const todoTextElement = e.target.previousElementSibling;
            const newValue = prompt("Edit task:", todoTextElement.textContent.trim());
            if (newValue) {
                todoTextElement.textContent = newValue.trim();
            }
        } else if (e.target.type === "checkbox") {
            updateProgressBar();
        }
    });
});
