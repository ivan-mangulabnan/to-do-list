import "./index.css";
import { Dom, FormDom } from "./scripts/dom-nodes.js";
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
    Dom.closeForm();
})

const closeFormButton = document.querySelector("#close-form-button");
closeFormButton.addEventListener("click", event => {
    Dom.closeForm();
})

const projectAdderBtn = document.querySelector("#add-project-btn");
projectAdderBtn.addEventListener("click", event => {
    const btnStatus = projectAdderBtn.textContent;
    if (btnStatus === "+") {
        Dom.showProjectAdder();
    } else {
        Dom.hideProjectAdder();
    }
})

const newProjBtn = document.querySelector(".new-proj-btn");
newProjBtn.addEventListener("click", event => {
    FormDom.addProject();
})
