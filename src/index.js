import "./index.css";
import { Dom, FormDom, Nav} from "./scripts/dom-nodes.js"
import { saveTodo } from "./scripts/create-todo.js";
import { Validation } from "./scripts/validation.js";
import { Projects } from "./scripts/projects.js";
import { Todos } from "./scripts/todos.js";

document.addEventListener("DOMContentLoaded", event => { // initialze the page.
    const savedItems = JSON.parse(localStorage.getItem("list"));
    if (savedItems !== null) savedItems.forEach(todo => Todos.list.push(new Todos(todo)));
    const savedProj = JSON.parse(localStorage.getItem("project"));
    if (savedProj !== null) savedProj.forEach(project => Projects.add(project));
    const homeButton = document.querySelector("#home-link");
    homeButton.closest("div").classList.add("nav-location");
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

form.addEventListener("keydown", event => {
    if (event.key === "Escape") Dom.hideProjectAdder();
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
    Dom.initialize();
})

const checklistBtn = document.querySelector("#checklist-button");  // checklist adder.
checklistBtn.addEventListener("click", FormDom.addChecklist);

const mainCheckDiv = document.querySelector("#checklist-div"); // checklist remover.
mainCheckDiv.addEventListener("click", event => {
    if (event.target.matches("button")) FormDom.removeChecklist(event.target);
})

const nav = document.querySelector("nav"); // Nav highlight design when clicked.
nav.addEventListener("click", event => {
    Nav.highlightDirectory(event);
})

const homeButton = document.querySelector("#home-link"); // Home Display.
homeButton.addEventListener("click", event => {
    Dom.initialize();
});

const navProjectDiv = document.querySelector("#nav-projects"); // Project Navs
navProjectDiv.addEventListener("click", event => {
    Dom.loadFullProject(event);
})

Dom.contentDiv.addEventListener("click", event => { // Show Edit Dom
    if (event.target.matches(".modify-button")) Dom.editTodoDisplay(event.target);
})

document.addEventListener("change", event => { // Changing the status on editDom
    if (event.target.matches(".edit-completion-status")) {
        const p = event.target.nextElementSibling;
        p.textContent = event.target.checked === true ? "COMPLETED" : "NOT YET COMPLETED";
    }
})

document.addEventListener("click", event => { // Show Add Project in Edit
    if (event.target.matches(".edit-add-proj") || event.target.matches(".edit-minus-proj")) {
        const newProj = document.querySelector(".edit-new-proj");
        if (event.target.textContent === "✚") {
            event.target.textContent = "-";
            event.target.className = "";
            event.target.classList.add("edit-minus-proj");
            newProj.classList.toggle("show-display");
            return
        }

        event.target.textContent = "✚";
        event.target.className = "";
        event.target.classList.add("edit-add-proj");
        newProj.classList.toggle("show-display");
    }
})

document.addEventListener("keydown", event => { // Escape key
    if (event.key === "Escape") {
        const editDialog = document.querySelector(".edit-dialog");
        const projectDialog = document.querySelector(".project-dialog");
        const warningDialog = document.querySelector(".warning-dialog");

        if (editDialog !== null ) editDialog.remove();
        if (projectDialog !== null) projectDialog.remove();
        if (warningDialog !== null) warningDialog.remove();
    }
})

document.addEventListener("click", event => {
    if (event.target.matches(".plus-proj")) { // Add New Proj in Edit
        const input = document.querySelector(".plus-proj-input");
        const btn = document.querySelector(".edit-minus-proj");
        const select = document.querySelector(".edit-item-select");

        if (!Validation.notEmpty(input.value)) {
            input.setCustomValidity("This field cannot be empty.");
            input.reportValidity();
            return
        }

        Projects.add(input.value);
        localStorage.setItem("project", JSON.stringify(Projects.list));
        select.innerHTML = "";
        Projects.list.forEach(project => {
            const opt = document.createElement("option");
            opt.value = project;
            opt.textContent = project;
            select.appendChild(opt);
        })
        input.value = "";
        Dom.initialize();
        btn.click();
    }

    if (event.target.matches(".checklist-plus")) { // creates new checklist in edit
        const chkDiv = document.querySelector(".checklist-chkdiv");
        FormDom.utilChecklist(chkDiv, false, "", "");
    }

    if (event.target.matches(".rmv-btn")) { // checklist item remove.
        const targetChecklist = event.target.closest(".checklist-single-div");
        targetChecklist.remove();
    }

    if (event.target.matches(".edit-rmv-btn")) { // whole dialog remove.
        const editDialog = document.querySelector(".edit-dialog");
        editDialog.remove();
    }

    if (event.target.matches(".edit-aprv-btn")) { // update Todo.
        const id = document.querySelector("#ed-id").value;
        const editDialog = document.querySelector(".edit-dialog");

        Dom.updateTodo(id);
        localStorage.setItem("list", JSON.stringify(Todos.list));
        Dom.initialize();
        editDialog.remove();
    }

    if (event.target.matches(".remove-button")) { // remove todo.
        const id = event.target.closest("[data-id]").getAttribute("data-id");
        const todo = Todos.list.findIndex(todo => todo.id);
        Todos.list.splice(todo, 1);
        localStorage.setItem("list", JSON.stringify(Todos.list));
        Dom.initialize();
    }

    if (event.target.matches(".project-edit-btn")) { // Project editor shower.
        const parentDiv = event.target.closest(".projectTitleDiv") || event.target.closest(".project-innerdiv-first");
        const textContent = parentDiv.querySelector("h3").textContent;
        FormDom.createDialogForProject(textContent);
    }

    if (event.target.matches(".up-btn")) { // Project editor.
        const input = event.target.closest("form").querySelector("input");
        const data = event.target.closest("div").getAttribute("data-name");

        if (!Validation.notEmpty(input.value)) {
            input.setCustomValidity("This can't be left empty.");
            input.reportValidity();
            return
        }

        FormDom.editProject(input.value, data);
        Dom.initialize();
        event.target.closest("dialog").remove();
    }

    if (event.target.matches(".x-btn")) { // removes dialog upon closure.
        event.target.closest("dialog").remove();
    }

    if (event.target.matches(".delBtn")) { // removes project.
        const parentDiv = event.target.closest(".projectTitleDiv") || event.target.closest(".project-innerdiv-first");
        const textContent = parentDiv.querySelector("h3").textContent;

        const todoArr = Todos.list.filter(todo => todo.project === textContent);

        if (todoArr.length !== 0) {
            Dom.showWarning();
            return
        }

        const target = Projects.list.findIndex(name => name === textContent);
        Projects.list.splice(target, 1);
        localStorage.setItem("project", JSON.stringify(Projects.list));
        Dom.initialize();
    }

    if (event.target.matches(".warning-ok")) {
        event.target.closest("dialog").remove();
    }
})