const BASE_URL = "http://localhost:8080/api/todo"

const STATUS_COMPLETE = "COMPLETE";
const STATUS_INCOMPLETE = "INCOMPLETE";

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
createForm.onsubmit = onCreationSubmit;

async function onPageLoaded() {
    const todos = await get_all_items();

    console.log("Retrieve elements from database:", todos);

    todos.forEach(create_element);
}

function onClick(event) {
    const type = event.target._type;
    if (!type) {
        return;
    }

    const handler = todoMap.get(type);
    if (handler) {
        handler(event);
    }
}

async function onCreationSubmit(e) {
    e.preventDefault();

    const task = createInput.value;
    console.log(`Save new task: '${task}'`);

    if (!task || task.trim() === "") {
        createInput.value = "";
        return false;
    }

    createInput.value = "";

    const savedTodo = await save_item({task: task});
    create_element(savedTodo);
}

// DB
function save_item(item) {
    return fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json());

}

function get_all_items(size = 25, page = 0) {
    return fetch(BASE_URL + `?size=${size}&page=${page}`, {
        method: "GET"
    })
        .then(value => value.json())
        .then(value => value.content);
}

function delete_item(id) {
    return fetch(BASE_URL + `/${id}`, {
        method: "DELETE"
    });
}

function check_item(id, checked) {
    let status = checked ? STATUS_COMPLETE : STATUS_INCOMPLETE;
    return fetch(BASE_URL + `/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                status: status
            }
        )
    })
        .then(response => response.json());
}

function update_item(id, item) {
    return fetch(BASE_URL + `/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json());
}

function get_item(id) {
    return fetch(BASE_URL + `/${id}`, {
        method: "GET"
    })
        .then(response => response.json());
}

// Handlers
async function _delete(event) {
    const parent = event.target.parentElement;
    const id = parent?._id;

    console.log(`Delete item with id = '${id}'`);

    if (!id) {
        console.log("Id not found!", event);
    }

    await delete_item(id);
    delete_element(parent);
}

async function _check(event) {
    const checkbox = event.target;
    const parent = checkbox.parentElement?.parentElement;
    const id = parent?._id;

    console.log(`Check item with id '${id}'`);

    if (!id) {
        return;
    }

    await check_item(id, checkbox.checked);
    check_element(parent, checkbox.checked);
}

function _open(event) {
    const target = event.target;
    const parent = target.parentElement;
    const text = target.innerText;

    console.log('Open item on edit');

    open_element(parent, text);
}

async function _save(event) {
    const parent = event.target.parentElement;
    const id = parent._id;
    const task = parent.querySelector(".todo__input--update")?.value;

    console.log(`New text '${task}' for task with id '${id}'`);

    if (!task || task.trim() === "") {
        console.log("text is empty -> delete item");

        await delete_item(id);
        delete_element(parent);
        return;
    }

    const item = await update_item(id, {task: task});
    update_element(parent, item);
}

async function _cancel(event) {
    const parent = event.target.parentElement;
    const id = parent._id;
    const item = await get_item(id);

    console.log(`Cancel edit task with id '${id}'`);

    update_element(parent, item);
}

//DOM
function create_element(item) {
    const li = __create_element(item);

    todoList.appendChild(li);
}

function update_element(parent, item) {
    const li = __create_element(item);

    parent.parentElement.replaceChild(li, parent);
}

function __create_element(item) {
    const checkbox = document.createElement("input");
    checkbox.classList.add("todo__checkbox");
    checkbox.type = "checkbox";
    checkbox.checked = item.status === STATUS_COMPLETE;
    checkbox._type = todoCheckbox;

    const label = document.createElement("label");
    label.appendChild(checkbox);

    const p = document.createElement("p");
    p.classList.add("todo__text");
    p.innerText = item.task;
    p._type = todoText;

    const button = document.createElement("button");
    button.classList.add("todo__button", "todo__button--delete");
    button.innerText = "Delete";
    button._type = todoDelete;

    const li = document.createElement("li");
    li.classList.add("todo__item");
    li._id = item.id;

    if (item.status === STATUS_COMPLETE) {
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
    if (checked) {
        __check_element_checked(parent);
    } else {
        __check_element_unchecked(parent);
    }
}

function __check_element_checked(parent) {
    parent.classList.add("todo__item--checked");
}

function __check_element_unchecked(parent) {
    parent.classList.remove("todo__item--checked");
}

function open_element(parent, text) {
    const input = document.createElement("input");
    input.classList.add("todo__input--update");
    input.type = "text";
    input.value = text;
    input.maxLength = 250;
    input.required = true;

    const label = document.createElement("label");
    label.classList.add("todo__label--update");
    label.appendChild(input);

    const saveButton = document.createElement("button");
    saveButton.classList.add("todo__button", "todo__button--save");
    saveButton.innerText = "Save";
    saveButton._type = todoSave;

    const cancelButton = document.createElement("button");
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
