import * as rest_client from "./rest/client";
import * as dom_processor from "./dom/todo_processor";

export const STATUS_COMPLETE = "COMPLETE";
export const STATUS_INCOMPLETE = "INCOMPLETE";

export const todoCheckbox = "todo_checkbox";
export const todoText = "todo_text";
export const todoDelete = "todo_delete";
export const todoSave = "todo_save";
export const todoCancel = "todo_cancel";

const todoMap = new Map();
todoMap.set(todoDelete, _delete);
todoMap.set(todoCheckbox, _check);
todoMap.set(todoText, _open);
todoMap.set(todoSave, _save);
todoMap.set(todoCancel, _cancel);

const createForm = document.getElementById("todo-creator");
const createInput = createForm.querySelector(".todo__input");
export const todoList = document.getElementById("todos");

document.addEventListener("DOMContentLoaded", onPageLoaded);
document.addEventListener("click", onClick)
createForm.onsubmit = onCreationSubmit;

async function onPageLoaded() {
    const todos = await rest_client.get_all_items();

    console.log("Retrieve elements from database:", todos);

    todos.forEach(dom_processor.create_element);
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

    const savedTodo = await rest_client.save_item({task: task});
    dom_processor.create_element(savedTodo);
}

// Handlers
async function _delete(event) {
    const parent = event.target.parentElement;
    const id = parent._id;

    console.log(`Delete item with id = '${id}'`);

    if (!id) {
        console.log("Id not found!", event);
    }

    await rest_client.delete_item(id);
    dom_processor.delete_element(parent);
}

async function _check(event) {
    const checkbox = event.target;
    const parent = checkbox.parentElement.parentElement;
    const id = parent._id;

    console.log(`Check item with id '${id}'`);

    if (!id) {
        return;
    }

    await rest_client.check_item(id, checkbox.checked);
    dom_processor.check_element(parent, checkbox.checked);
}

function _open(event) {
    const target = event.target;
    const parent = target.parentElement;
    const text = target.innerText;

    console.log('Open item on edit');

    dom_processor.open_element(parent, text);
}

async function _save(event) {
    const parent = event.target.parentElement;
    const id = parent._id;
    const task = parent.querySelector(".todo__input--update").value;

    console.log(`New text '${task}' for task with id '${id}'`);

    if (!task || task.trim() === "") {
        console.log("text is empty -> delete item");

        await rest_client.delete_item(id);
        dom_processor.delete_element(parent);
        return;
    }

    const item = await rest_client.update_item(id, {task: task});
    dom_processor.update_element(parent, item);
}

async function _cancel(event) {
    const parent = event.target.parentElement;
    const id = parent._id;
    const item = await rest_client.get_item(id);

    console.log(`Cancel edit task with id '${id}'`);

    dom_processor.update_element(parent, item);
}
