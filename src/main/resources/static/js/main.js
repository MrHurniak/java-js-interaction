/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/webapp/js/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/webapp/js/src/dom/todo_processor.js":
/*!******************************************************!*\
  !*** ./src/main/webapp/js/src/dom/todo_processor.js ***!
  \******************************************************/
/*! exports provided: create_element, update_element, __create_element, delete_element, open_element, check_element */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_element", function() { return create_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_element", function() { return update_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__create_element", function() { return __create_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delete_element", function() { return delete_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "open_element", function() { return open_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "check_element", function() { return check_element; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/main/webapp/js/src/index.js");


function create_element(item) {
    const li = __create_element(item);

    _index__WEBPACK_IMPORTED_MODULE_0__["todoList"].appendChild(li);
}

function update_element(parent, item) {
    const li = __create_element(item);

    parent.parentElement.replaceChild(li, parent);
}

function __create_element(item) {
    const checkbox = document.createElement("input");
    checkbox.classList.add("todo__checkbox");
    checkbox.type = "checkbox";
    checkbox.checked = item.status === _index__WEBPACK_IMPORTED_MODULE_0__["STATUS_COMPLETE"];
    checkbox._type = _index__WEBPACK_IMPORTED_MODULE_0__["todoCheckbox"];

    const label = document.createElement("label");
    label.appendChild(checkbox);

    const p = document.createElement("p");
    p.classList.add("todo__text");
    p.innerText = item.task;
    p._type = _index__WEBPACK_IMPORTED_MODULE_0__["todoText"];

    const button = document.createElement("button");
    button.classList.add("todo__button", "todo__button--delete");
    button.innerText = "Delete";
    button._type = _index__WEBPACK_IMPORTED_MODULE_0__["todoDelete"];

    const li = document.createElement("li");
    li.classList.add("todo__item");
    li._id = item.id;

    if (item.status === _index__WEBPACK_IMPORTED_MODULE_0__["STATUS_COMPLETE"]) {
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
    saveButton._type = _index__WEBPACK_IMPORTED_MODULE_0__["todoSave"];

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("todo__button", "todo__button--cancel");
    cancelButton.innerText = "Cancel";
    cancelButton._type = _index__WEBPACK_IMPORTED_MODULE_0__["todoCancel"];

    parent.classList.remove("todo__item--checked");
    parent.classList.add("todo__item--open");
    parent.innerHTML = "";

    parent.appendChild(label);
    parent.appendChild(saveButton);
    parent.appendChild(cancelButton);
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


/***/ }),

/***/ "./src/main/webapp/js/src/index.js":
/*!*****************************************!*\
  !*** ./src/main/webapp/js/src/index.js ***!
  \*****************************************/
/*! exports provided: STATUS_COMPLETE, STATUS_INCOMPLETE, todoCheckbox, todoText, todoDelete, todoSave, todoCancel, todoList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_COMPLETE", function() { return STATUS_COMPLETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_INCOMPLETE", function() { return STATUS_INCOMPLETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "todoCheckbox", function() { return todoCheckbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "todoText", function() { return todoText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "todoDelete", function() { return todoDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "todoSave", function() { return todoSave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "todoCancel", function() { return todoCancel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "todoList", function() { return todoList; });
/* harmony import */ var _rest_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rest/client */ "./src/main/webapp/js/src/rest/client.js");
/* harmony import */ var _dom_todo_processor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom/todo_processor */ "./src/main/webapp/js/src/dom/todo_processor.js");



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
    const todos = await _rest_client__WEBPACK_IMPORTED_MODULE_0__["get_all_items"]();

    console.log("Retrieve elements from database:", todos);

    todos.forEach(_dom_todo_processor__WEBPACK_IMPORTED_MODULE_1__["create_element"]);
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

    const savedTodo = await _rest_client__WEBPACK_IMPORTED_MODULE_0__["save_item"]({task: task});
    _dom_todo_processor__WEBPACK_IMPORTED_MODULE_1__["create_element"](savedTodo);
}

// Handlers
async function _delete(event) {
    const parent = event.target.parentElement;
    const id = parent._id;

    console.log(`Delete item with id = '${id}'`);

    if (!id) {
        console.log("Id not found!", event);
    }

    await _rest_client__WEBPACK_IMPORTED_MODULE_0__["delete_item"](id);
    _dom_todo_processor__WEBPACK_IMPORTED_MODULE_1__["delete_element"](parent);
}

async function _check(event) {
    const checkbox = event.target;
    const parent = checkbox.parentElement.parentElement;
    const id = parent._id;

    console.log(`Check item with id '${id}'`);

    if (!id) {
        return;
    }

    await _rest_client__WEBPACK_IMPORTED_MODULE_0__["check_item"](id, checkbox.checked);
    _dom_todo_processor__WEBPACK_IMPORTED_MODULE_1__["check_element"](parent, checkbox.checked);
}

function _open(event) {
    const target = event.target;
    const parent = target.parentElement;
    const text = target.innerText;

    console.log('Open item on edit');

    _dom_todo_processor__WEBPACK_IMPORTED_MODULE_1__["open_element"](parent, text);
}

async function _save(event) {
    const parent = event.target.parentElement;
    const id = parent._id;
    const task = parent.querySelector(".todo__input--update").value;

    console.log(`New text '${task}' for task with id '${id}'`);

    if (!task || task.trim() === "") {
        console.log("text is empty -> delete item");

        await _rest_client__WEBPACK_IMPORTED_MODULE_0__["delete_item"](id);
        _dom_todo_processor__WEBPACK_IMPORTED_MODULE_1__["delete_element"](parent);
        return;
    }

    const item = await _rest_client__WEBPACK_IMPORTED_MODULE_0__["update_item"](id, {task: task});
    _dom_todo_processor__WEBPACK_IMPORTED_MODULE_1__["update_element"](parent, item);
}

async function _cancel(event) {
    const parent = event.target.parentElement;
    const id = parent._id;
    const item = await _rest_client__WEBPACK_IMPORTED_MODULE_0__["get_item"](id);

    console.log(`Cancel edit task with id '${id}'`);

    _dom_todo_processor__WEBPACK_IMPORTED_MODULE_1__["update_element"](parent, item);
}


/***/ }),

/***/ "./src/main/webapp/js/src/rest/client.js":
/*!***********************************************!*\
  !*** ./src/main/webapp/js/src/rest/client.js ***!
  \***********************************************/
/*! exports provided: save_item, get_all_items, delete_item, check_item, update_item, get_item */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "save_item", function() { return save_item; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_all_items", function() { return get_all_items; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delete_item", function() { return delete_item; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "check_item", function() { return check_item; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update_item", function() { return update_item; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_item", function() { return get_item; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "./src/main/webapp/js/src/index.js");


const BASE_URL = "http://localhost:8080/api/todo"

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
    let status = checked ? _index__WEBPACK_IMPORTED_MODULE_0__["STATUS_COMPLETE"] : _index__WEBPACK_IMPORTED_MODULE_0__["STATUS_INCOMPLETE"];
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


/***/ })

/******/ });
//# sourceMappingURL=main.js.map