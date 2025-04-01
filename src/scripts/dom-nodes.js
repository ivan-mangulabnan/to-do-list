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
            div.classList.add("project-div");
            div.setAttribute("data-project", `${title}`);
            const innverDiv = document.createElement("div");
            innverDiv.classList.toggle("flex");
            innverDiv.classList.toggle("gap");
            innverDiv.classList.add("project-innerdiv-first");
            const h3 = document.createElement("h3");
            const btnDiv = document.createElement("div");
            btnDiv.classList.add("btnDiv");
            const editBtn = document.createElement("button");
            editBtn.classList.toggle("project-edit-btn");
            const delBtn = document.createElement("button");
            delBtn.classList.toggle("delBtn");
            h3.textContent = title;
            h3.classList.add("project-name");

            const innerdiv2 = document.createElement("div");
            innerdiv2.id = "allTodosDiv";

            btnDiv.append(editBtn, delBtn);
            innverDiv.append(h3, btnDiv);
            div.append(innverDiv, innerdiv2);
            Dom.contentDiv.appendChild(div);
        })
    }

    static initialize() {
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
        priorityNode.innerHTML = "";
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

            const allTodosDiv = div.querySelector("#allTodosDiv");
            allTodosDiv.classList.add("allTodosDiv");

            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todoDiv");
            const colorDiv = document.createElement("div");
            colorDiv.classList.add(`${Dom.addColorToTodo(todo.priority)}`);
            const title = document.createElement("h4");
            title.textContent = todo.title;
            title.classList.add("todoTitle");
            const buttonsDiv = document.createElement("div");
            buttonsDiv.classList.add("buttonsDiv");
            const editButton = document.createElement("button");
            editButton.classList.add("editButton");
            const delButton = document.createElement("button");
            delButton.classList.add("delButton");

            buttonsDiv.append(editButton, delButton);
            todoDiv.append(colorDiv, title, buttonsDiv);
            allTodosDiv.appendChild(todoDiv);
        })
    }

    static addColorToTodo(priority) {
        switch(priority) {
            case "Top Priority":
                return "topPrio";
            break
            case "Medium Priority":
                return "midPrio";
            break
            case "Low Priority":
                return "lowPrio";
            break
        }
    }

    static closeForm() {
        const form = document.querySelector("#task-form");
        const dialog = document.querySelector("#form-dialog");
        form.reset();
        FormDom.clearChecklist();
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

    static removeChecklist(target) {
        const targetDiv = target.closest("[data-id]");
        targetDiv.remove();
    }

    static clearChecklist() {
        const mainCheckDiv = document.querySelector("#checklist-div");
        mainCheckDiv.innerHTML = "";
    }
}