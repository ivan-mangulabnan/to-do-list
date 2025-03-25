import "./index.css";
import { passUserInput } from "./scripts/dom/user-input.js";
import { loadFormOptions } from "./scripts/dom/form-option-getter.js";
import { addDomChecklist } from "./scripts/dom/dom-add-checklist.js";
import { homeInterface } from "./scripts/projects.js";
import { pushTask, Todos } from "./scripts/todo.js";

const createButton = document.querySelector("#create-button");
createButton.addEventListener("click", e => {
    pushTask(passUserInput());
    console.log(Todos.list);
})

document.addEventListener("DOMContentLoaded", e => {
    homeInterface();
    loadFormOptions();
});

const checklistButton = document.querySelector("#checklist-button");
checklistButton.addEventListener("click", addDomChecklist );

const btnShowForm = document.querySelector("#show-form-btn");
btnShowForm.addEventListener("click", event => {
    const dialog = document.querySelector("#form-dialog");
    dialog.showModal();
})