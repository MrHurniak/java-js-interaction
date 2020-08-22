const BASE_URL = "http://localhost:8080/api"

const todoCheckbox = "todo_checkbox";
const todoText = "todo_text";
const todoDelete = "todo_delete";
const todoSave = "todo_save";
const todoCancel = "todo_cancel";

const todoMap = new Map();
todoMap.set(todoDelete, _delete);
todoMap.set(todoCheckbox, _check);
todoMap.set(todoText, _open);
todoMap.set(todoSave, _save);
todoMap.set(todoCancel, _cancel);


const createForm = document.getElementById("todo-creator");
const createInput = createForm.querySelector(".todo__input");
const todoList = document.getElementById("todos");

document.addEventListener("DOMContentLoaded", onPageLoaded);
document.addEventListener("click", onClick)
createForm.onsubmit = creationSubmit;

function onPageLoaded() {
    let todos = localStorage.getItem("todos");
    todos = todos ? JSON.parse(todos) : [];

    console.log("Retrieve elements from local storage: ", todos);

    todos.forEach(create_element);
}

function onClick(event) {
    const type = event.target._type;
    if (!type) {
        return;
    }
    console.log(type);
    let handler = todoMap.get(type);
    if (handler) {
        console.log("Found handler")
        handler(event);
        return;
    }
    console.log("Handler not found!")
}

function creationSubmit(e) {
    e.preventDefault();

    let value = createInput.value;
    console.log(value);

    if (!value || value.trim() === "") {
        createInput.value = "";
        //todo make red
        return false;
    }

    createInput.value = "";

    //todo call here
    const newTodo = {
        id: "id" + Math.floor(Math.random() * 50),
        task: value,
        status: "INCOMPLETE"
    }
    save_item(newTodo);
    create_element(newTodo);
}

// DB work

function save_item(todoItem) {
    let todos = localStorage.getItem("todos");
    todos = todos ? JSON.parse(todos) : [];

    todoItem.id = _uuidv4();

    console.log("Save:", todoItem);

    todos.push(todoItem);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function _uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function delete_item(id) {
    let todos = localStorage.getItem("todos");
    todos = todos ? JSON.parse(todos) : [];

    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            todos.splice(i, 1);
            break;
        }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}

function check_item(id, checked) {
    let todos = localStorage.getItem("todos");
    todos = todos ? JSON.parse(todos) : [];

    console.log(`Check: id = '${id}', value='${checked}'`);

    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        if (todo.id === id) {
            todo.status = checked ? "COMPLETE" : "INCOMPLETE";
            break;
        }
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}

function update_item(id, text) {
    let todos = localStorage.getItem("todos");
    todos = todos ? JSON.parse(todos) : [];

    console.log(`Update: id = '${id}', value='${text}'`);
    let todo;
    for (let i = 0; i < todos.length; i++) {
        todo = todos[i];
        if (todo.id === id) {
            todo.task = text;
            break;
        }
    }
    localStorage.setItem("todos", JSON.stringify(todos));

    return todo;
}

function get_item(id) {
    let todos = localStorage.getItem("todos");
    todos = todos ? JSON.parse(todos) : [];

    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];
        if (todo.id === id) {
            return todo;
        }
    }
}

// handlers

function _delete(event) {
    const parent = event.target.parentElement;
    const id = parent?._id;

    console.log(`Delete item with id = '${id}'`);

    if (!id) {
        console.log("Id not found!", event);
    }

    delete_item(id);
    delete_element(parent);
}

function _check(event) {
    let checkbox = event.target;
    const parent = checkbox.parentElement?.parentElement;
    const id = parent?._id;

    console.log(`Check item with id '${id}'`);

    if (!id) {
        return;
    }

    check_item(id, checkbox.checked);
    check_element(parent, checkbox.checked);
}

function _open(event) {
    let target = event.target;
    let parent = target.parentElement;
    let text = target.innerText;

    console.log('Open item on edit');

    open_element(parent, text);
}

function _save(event) {
    let parent = event.target.parentElement;
    let id = parent._id;
    let text = parent.querySelector(".todo__input--update")?.value;

    console.log(`New text '${text}'`);

    if (!text || text.trim() === "") {
        console.log("text is empty -> delete item");
        delete_item(id);
        delete_element(parent);
        return;
    }

    let item = update_item(id, text);
    update_element(parent, item);
}

function _cancel(event) {
    let parent = event.target.parentElement;
    let id = parent._id;
    let item = get_item(id);

    update_element(parent, item);
}

//HTML work

function create_element(item) {
    let li = _create_element(item);

    todoList.appendChild(li);
}

function update_element(parent, item) {
    let li = _create_element(item);

    parent.parentElement.replaceChild(li, parent);
}

function _create_element(item) {
    let checkbox = document.createElement("input");
    checkbox.classList.add("todo__checkbox");
    checkbox.type = "checkbox";
    checkbox.checked = item.status === "COMPLETE";
    checkbox._type = todoCheckbox;

    let label = document.createElement("label");
    label.appendChild(checkbox);

    let p = document.createElement("p");
    p.classList.add("todo__text");
    p.innerText = item.task;
    p._type = todoText;

    let button = document.createElement("button");
    button.classList.add("todo__button", "todo__button--delete");
    button.innerText = "Delete";
    button._type = todoDelete;

    let li = document.createElement("li");
    li.classList.add("todo__item");
    li._id = item.id;

    if (item.status === "COMPLETE") {
        li.classList.add("todo__item--checked");
    }

    li.appendChild(label);
    li.appendChild(p);
    li.appendChild(button);

    return li;
}

function delete_element(parent) {
    parent.parentElement.removeChild(parent);
}

function check_element(parent, checked) {
    let classList = parent.classList;
    if (checked) {
        classList.add("todo__item--checked");
    } else {
        classList.remove("todo__item--checked");
    }
}

function open_element(parent, text) {
    let input = document.createElement("input");
    input.classList.add("todo__input--update");
    input.type = "text";
    input.value = text;
    input.maxLength = 250;
    input.required = true;

    let label = document.createElement("label");
    label.classList.add("todo__label--update");
    label.appendChild(input);

    let saveButton = document.createElement("button");
    saveButton.classList.add("todo__button", "todo__button--save");
    saveButton.innerText = "Save";
    saveButton._type = todoSave;

    let cancelButton = document.createElement("button");
    cancelButton.classList.add("todo__button", "todo__button--cancel");
    cancelButton.innerText = "Cancel";
    cancelButton._type = todoCancel;

    parent.classList.remove("todo__item--checked");
    parent.classList.add("todo__item--open");
    parent.innerHTML = "";

    parent.appendChild(label);
    parent.appendChild(saveButton);
    parent.appendChild(cancelButton);
}


