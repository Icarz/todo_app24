const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoListUl = document.getElementById("todo-list");

let allToDos = getTodos();
updateTodolist();

todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
      Text: todoText,
      completed: false,
    };
    allToDos.push(todoObject);
    updateTodolist();
    saveTodos();
    todoInput.value = "";
  }
}

function updateTodolist() {
  todoListUl.innerHTML = "";
  allToDos.forEach((todo, todoIndex) => {
    const todoItem = createTodoItem(todo, todoIndex);
    todoListUl.append(todoItem);
  });
}

function createTodoItem(todo, todoIndex) {
  const todoId = "todo-" + todoIndex;
  const todoLI = document.createElement("li");
  const todoText = todo.text;
  todoLI.className = "todo";
  todoLI.innerHTML = `  
    <input type="checkbox" id=${todoId} />
    <label class="custom-checkbox" for=${todoId}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#000000"
      >
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
      </svg>
    </label>
    <label class="todo-text" for=${todoId}>
      ${todoText}</label>
    <button class="delete-button">
      <svg
        fill="var(--secondary-color)"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#000000"
      >
        <path
          d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
        />
      </svg>
    </button>`;

  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoItem(todoIndex);
  });
  const checkbox = todoLI.querySelector("input");
  checkbox.addEventListener("change", () => {
    allToDos[todoIndex].completed = checkbox.checked;
    saveTodos();
  });
  checkbox.checked = todo.completed;
  return todoLI;
}
// delete logic //

function deleteTodoItem(todoIndex) {
  allToDos = allToDos.filter((_, i) => i !== todoIndex);
  saveTodos();
  updateTodolist();
}

// local Storage  //

function saveTodos() {
  const todoJson = JSON.stringify(allToDos);
  localStorage.setItem("todos", todoJson);
}

function getTodos() {
  const todos = localStorage.getItem("todos") || "[]";
  return JSON.parse(todos);
}
