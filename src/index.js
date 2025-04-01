import "./index.css";
import { Dom, FormDom } from "./scripts/dom-nodes.js";
import { saveTodo } from "./scripts/create-todo.js";

document.addEventListener("DOMContentLoaded", event => { // initialze the page.
    Dom.initialize();
})

const showFormBtn = document.querySelector("#show-form-btn"); 
const formDialog = document.querySelector("#form-dialog");
showFormBtn.addEventListener("click", event => { // dialog shower
    
    Dom.loadFormOptions();
    Dom.loadPriorities();
    formDialog.showModal();
    
})

const form = document.querySelector("#task-form"); // check for submission
form.addEventListener("submit", event => {
    event.preventDefault();
    saveTodo();
    Dom.initialize();
    Dom.closeForm();
})

const closeFormButton = document.querySelector("#close-form-button"); // dialog closer
closeFormButton.addEventListener("click", event => {
    Dom.closeForm();
})

const projectAdderBtn = document.querySelector("#add-project-btn"); // show/hide project adder
projectAdderBtn.addEventListener("click", event => {
    const btnStatus = projectAdderBtn.textContent;
    if (btnStatus === "+") {
        Dom.showProjectAdder();
    } else {
        Dom.hideProjectAdder();
    }
})

const newProjBtn = document.querySelector(".new-proj-btn"); // project adder
newProjBtn.addEventListener("click", event => {
    FormDom.addProject();
})

const checklistBtn = document.querySelector("#checklist-button");  // checklist adder.
checklistBtn.addEventListener("click", FormDom.addChecklist);

const mainCheckDiv = document.querySelector("#checklist-div"); // checklist remover.
mainCheckDiv.addEventListener("click", event => {
    if (event.target.matches("button")) FormDom.removeChecklist(event.target);
})