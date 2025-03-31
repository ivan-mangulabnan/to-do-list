import { Todos } from "./todos.js";
import { Projects } from "./projects.js";
import { Priority } from "./priority.js";
import { Validation } from "./validation.js"; 

export class Dom {
    
    static contentDiv = document.querySelector("#content");

    static noTask() {
        Dom.contentDiv.innerHTML = "";
        const p = document.createElement("p");
        p.textContent = "No Pending Tasks";
        Dom.contentDiv.classList.add("no-task");
        Dom.contentDiv.appendChild(p);
    }

    static displayAllProjectWithTodos() {
        Dom.contentDiv.innerHTML = "";
        Dom.contentDiv.classList.remove("no-task");

        Todos.getProjectsWithTodo().forEach(title => {
            const div = document.createElement("div");
            div.setAttribute("data-project", `${title}`);
            const h3 = document.createElement("h3");
            h3.textContent = title;
            h3.classList.add("project-name");
            div.appendChild(h3);
            Dom.contentDiv.appendChild(div);
        })
    }

    static initialize() {
        Dom.loadFormOptions();
        Dom.loadPriorities();

        if (Todos.isEmpty() === true) {
            Dom.noTask();
        } else {
            Dom.displayAllProjectWithTodos();
            Dom.displayTodo();
        }
    }

    static loadFormOptions() {
        const projectNode = document.querySelector("#project");
        projectNode.innerHTML = "";
        Projects.list.forEach(project => {
            const option = document.createElement("option");
            option.textContent = project;
            projectNode.appendChild(option);
        })
    }

    static loadPriorities() {
        const priorityNode = document.querySelector("#priority");
        Priority.list.forEach(priority => {
            const option = document.createElement("option");
            option.textContent = priority;
            priorityNode.appendChild(option);
        })
        priorityNode.value = Priority.list[1];
    }

    static displayTodo() {
        Todos.list.forEach(todo => {
            const div = Dom.contentDiv.querySelector(`[data-project="${todo.project}"]`);
            if (div === null) console.log("Yes it's null");
            const taskDiv = document.createElement("div");
            const titleNode = document.createElement("h4");
            titleNode.textContent = todo.title;
            const descriptionNode = document.createElement("p");
            descriptionNode.textContent = todo.description;
            taskDiv.append(titleNode,descriptionNode);
            div.append(taskDiv);
        })
    }

    static closeForm() {
        const form = document.querySelector("#task-form");
        const dialog = document.querySelector("#form-dialog");
        form.reset();
        dialog.close();
    }

    static showProjectAdder() {
        const newProjectDiv = document.querySelector(".new-project-container");
        const projectAdderBtn = document.querySelector("#add-project-btn");
        projectAdderBtn.textContent = "-";
        projectAdderBtn.classList.add("minus-button");
        newProjectDiv.classList.add("flex");
    }

    static hideProjectAdder() {
        const newProjectDiv = document.querySelector(".new-project-container");
        const projectAdderBtn = document.querySelector("#add-project-btn");
        projectAdderBtn.textContent = "+";
        projectAdderBtn.classList.remove("minus-button");
        newProjectDiv.classList.remove("flex");
    }
}

export class FormDom extends Dom {
    static addProject() {
       const input = document.querySelector("#add-project-input");
       const project = document.querySelector("#project");

       if (!Validation.notEmpty(input.value)) { //Checks if empty or just pure white space.
            input.setCustomValidity("This field cannot be empty.");
            input.reportValidity();
            return
       }

       Projects.add(input.value);
       super.hideProjectAdder();
       super.loadFormOptions();

       project.value = input.value; // sets the input value as it's default.

       input.value = "";
    }

    static addChecklist() {
        const mainCheckDiv = document.querySelector("#checklist-div");

        const allChecklists = mainCheckDiv.querySelectorAll(".checkdiv"); // To determine the data-id attribute.

        const outerDiv = document.createElement("div");
        outerDiv.classList.add("checkdiv");
        outerDiv.setAttribute("data-id", `${allChecklists.length + 1}`);

        const innerDiv1 = document.createElement("div");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const input = document.createElement("input");
        input.type = "text";
        const quantity = document.createElement("input");
        quantity.type = "number";

        const innerDiv2 = document.createElement("div");
        const delBtn = document.createElement("button");
        delBtn.textContent = "x";

        innerDiv2.appendChild(delBtn);
        innerDiv1.append(checkbox, input, quantity);
        outerDiv.append(innerDiv1, innerDiv2);
        mainCheckDiv.appendChild(outerDiv);
    }
}