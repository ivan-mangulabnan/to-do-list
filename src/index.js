import "./index.css";
import { Dom } from "./scripts/dom/dom-nodes.js";
import { saveTodo } from "./scripts/create-todo.js";

document.addEventListener("DOMContentLoaded", event => {
    Dom.initialize();
})

const showFormBtn = document.querySelector("#show-form-btn");
const formDialog = document.querySelector("#form-dialog");
showFormBtn.addEventListener("click", event => {
    formDialog.showModal();
})

const form = document.querySelector("#task-form");
form.addEventListener("submit", event => {
    event.preventDefault();
    saveTodo();
    Dom.initialize();
})