import { Todos } from "./todos.js";
import { Projects } from "../projects.js";

export class Dom {
    
    static contentDiv = document.querySelector("#content");

    static noTask() {
        Dom.contentDiv.innerHTML = "";
        const p = document.createElement("p");
        p.textContent = "No Pending Tasks";
        Dom.contentDiv.classList.add("no-task");
        Dom.contentDiv.appendChild(p);
    }

    static displayAllProjectTitles() {
        Dom.contentDiv.innerHTML = "";
        Dom.contentDiv.classList.remove("no-task");

        Projects.list.forEach(title => {
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
            Dom.displayAllProjectTitles();
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
    }

    static displayTodo() {
        Todos.list.forEach(todo => {
            const project = todo.project;
            const div = Dom.contentDiv.querySelector(`[data-project="${project}"]`);
            const taskDiv = document.createElement("div");
            const titleNode = document.createElement("h4");
            titleNode.textContent = todo.title;
            const descriptionNode = document.createElement("p");
            descriptionNode.textContent = todo.description;
            taskDiv.append(titleNode,descriptionNode);
            div.append(taskDiv);
        })
    }
}

class Priority {
    static list = ["Top Priority", "Medium Priority", "Low Priority"];
}

export class Form {

    static #input = {}

    static get input() {
        Object.getOwnPropertyNames(this)
        .filter(name => typeof Object.getOwnPropertyDescriptor(this, name).value === "function" && name !== "constructor" && name !== "input")
        .map(func => this[func]()); // Automatically runs all the methods when called.

        return this.#input;
    }

    static getProject() {
        const projectNode = document.querySelector("#project");
        this.#input["project"] = projectNode.value;
    }

    static getTitle() {
        const titleNode = document.querySelector("#title");
        this.#input["title"] = titleNode.value;
    }
    
    static getDescription() {
        const descriptionNode = document.querySelector("#description");
        this.#input["description"] = descriptionNode.value;
    }
    
    static getDueDate() {
        const dueDateNode = document.querySelector("#dueDate");
        this.#input["dueDate"] = dueDateNode.value;
    }
    
    static getPriority() {
        const priorityNode = document.querySelector("#priority");
        this.#input["priority"] = priorityNode.value;
    }
    
    static getNotes() {
        const notesNode = document.querySelector("#notes");
        this.#input["notes"] = notesNode.value;
    }
    
    static getChecklist() {
        const checklistDiv = document.querySelector("#checklist-container");
        const checklists = Array.from(checklistDiv.querySelectorAll("div"));
    
        if (checklists.length === 0) {
            this.#input["checklist"] = null;
            return
        }
    
        let checklistArr = [];
    
        checklists.forEach(checklist => {
            const textNode = checklist.querySelector("input");
            textNode.type = "text";
            const text = textNode.value;
            const quantityNode = checklist.querySelector("input");
            quantityNode.type = "number";
            const quantity = quantityNode.value;
            const statusNode = checklist.querySelector("input");
            statusNode.type = "checkbox";
            const status = statusNode.checked ? true : false;
    
            checklistArr.push({text, quantity, status});
        })
    
        this.#input["checklist"] = checklistArr;
    }
    
    static getCompletionStatus() {
        const completionStatusNode = document.querySelector("#completionStatus");
        this.#input["completionStatus"] = completionStatusNode.checked ? true : false;
    }
}