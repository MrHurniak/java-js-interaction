import {STATUS_COMPLETE, todoCancel, todoCheckbox, todoDelete, todoList, todoSave, todoText} from "../index";

export function create_element(item) {
    const li = __create_element(item);

    todoList.appendChild(li);
}

export function update_element(parent, item) {
    const li = __create_element(item);

    parent.parentElement.replaceChild(li, parent);
}

export function __create_element(item) {
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

export function delete_element(parent) {
    parent.parentElement.removeChild(parent);
}

export function open_element(parent, text) {
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

export function check_element(parent, checked) {
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
