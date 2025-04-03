import { Todos } from "./todos.js";
import { Projects } from "./projects.js";
import { Priority } from "./priority.js";
import { Validation } from "./validation.js";
import * as dateFns from "date-fns";

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
        const homeButton = document.querySelector("#home-link");
        homeButton.click(); //sets the initialization with design.

        Nav.showProjects();

        if (Todos.isEmpty() === true) {
            Dom.noTask();
        } else {
            Dom.displayAllProjectWithTodos();
            Dom.displayTodo();
        }
    }

    static loadFullProject(event) {
        if (!event.target.matches("a")) return
        Dom.contentDiv.innerHTML = "";
        Dom.contentDiv.classList.remove("no-task");

        const project = event.target.textContent;
        const filteredTodos = Todos.list.filter(todo => todo.project === project);
        
        const mainDiv = document.createElement("div");
        mainDiv.classList.add("projectMainDiv");
        const projectTitleDiv = document.createElement("div");
        projectTitleDiv.classList.add("projectTitleDiv");
        const todoDiv = document.createElement("div");

        const h3Div = document.createElement("div");
        const h3 = document.createElement("h3");
        h3.classList.add("project-name");
        h3.textContent = project;

        const btnsDiv = document.createElement("div");
        btnsDiv.classList.add("btnsDiv");
        const editBtn = document.createElement("button");
        editBtn.classList.add("project-edit-btn");
        const delBtn = document.createElement("button");
        delBtn.classList.add("delBtn");

        if (filteredTodos.length === 0) {
            todoDiv.classList.add("empty");
            const p = document.createElement("p");
            p.textContent = `${project} Project is currently empty`;
            p.classList.add("zero-task");
            todoDiv.appendChild(p);
        } else {
            todoDiv.classList.add("withTodo");

            filteredTodos.forEach(todo => {

                const todoWrapper = document.createElement("div");
                todoWrapper.classList.add("todo-wrapper");
                todoWrapper.classList.add("todo");

                const titleDiv = document.createElement("div");
                titleDiv.classList.add("todo-main-div"); // category div class

                const titleHeader = document.createElement("p");
                titleHeader.classList.add("todo-headers"); // all header class
                titleHeader.textContent = "TITLE";

                const titlePWrapper = document.createElement("div");
                titlePWrapper.classList.add("todo-content-wrapper"); // content wrapper class

                const titleP = document.createElement("p");
                titleP.classList.add("todo-content-item"); // content class
                titleP.textContent = todo.title;

                titlePWrapper.appendChild(titleP);
                titleDiv.append(titleHeader, titlePWrapper);

                const datePrioDiv = document.createElement("div"); // Date and Priority Here Starts Here.
                datePrioDiv.classList.add("date-prio-div");

                const dateDiv = document.createElement("div"); // Date starts Here
                dateDiv.classList.add("todo-main-div");

                const dateHeader = document.createElement("p");
                dateHeader.textContent = "DUE DATE";
                dateHeader.classList.add("todo-headers");

                const datePWrapper = document.createElement("div");
                datePWrapper.classList.add("todo-content-wrapper");

                const dateP = document.createElement("p");
                dateP.textContent = dateFns.format(todo.dueDate, "MMMM d, yyyy");
                dateP.classList.add("todo-content-item");
                
                datePWrapper.appendChild(dateP);
                dateDiv.append(dateHeader, datePWrapper);

                const prioDiv = document.createElement("div"); // Priority starts Here
                prioDiv.classList.add("todo-main-div");

                const prioHeader = document.createElement("p");
                prioHeader.textContent = "PRIORITY";
                prioHeader.classList.add("todo-headers");

                const prioPWrapper = document.createElement("div");
                prioPWrapper.classList.add("todo-content-wrapper");

                const prioP = document.createElement("p");
                prioP.textContent = todo.priority;
                prioP.classList.add("todo-content-item");

                switch(todo.priority) {
                    case "Top Priority":
                        prioPWrapper.classList.add("top");
                    break
                    case "Medium Priority":
                        prioPWrapper.classList.add("mid");
                    break
                    case "Low Priority":
                        prioPWrapper.classList.add("low");
                    break
                }
                
                prioPWrapper.appendChild(prioP);
                prioDiv.append(prioHeader, prioPWrapper);

                datePrioDiv.append(dateDiv, prioDiv);

                todoWrapper.append(titleDiv, datePrioDiv);
                todoDiv.appendChild(todoWrapper);

                if (todo.description !== "") {
                    const descriptionDiv = document.createElement("div"); // Description starts Here
                    descriptionDiv.classList.add("todo-main-div");
    
                    const descriptionHeader = document.createElement("p");
                    descriptionHeader.textContent = "DESCRIPTION";
                    descriptionHeader.classList.add("todo-headers");
    
                    const descriptionPWrapper = document.createElement("div");
                    descriptionPWrapper.classList.add("todo-content-wrapper");
    
                    const descriptionP = document.createElement("p");
                    descriptionP.textContent = todo.description;
                    descriptionP.classList.add("todo-content-item");
                    
                    descriptionPWrapper.appendChild(descriptionP);
                    descriptionDiv.append(descriptionHeader, descriptionPWrapper);

                    todoWrapper.appendChild(descriptionDiv);
                }

                if (todo.notes !== "") {
                    const notesDiv = document.createElement("div"); // Note starts Here
                    notesDiv.classList.add("todo-main-div");
    
                    const notesHeader = document.createElement("p");
                    notesHeader.textContent = "NOTES";
                    notesHeader.classList.add("todo-headers");
    
                    const notesPWrapper = document.createElement("div");
                    notesPWrapper.classList.add("todo-content-wrapper");
    
                    const notesP = document.createElement("p");
                    notesP.textContent = todo.notes;
                    notesP.classList.add("todo-content-item");
                    
                    notesPWrapper.appendChild(notesP);
                    notesDiv.append(notesHeader, notesPWrapper);
                    
                    todoWrapper.append(notesDiv);
                }

                if (todo.checklist !== null && todo.checklist.length !== 0) {
                    const checkDiv = document.createElement("div"); // Checklist starts Here
                    checkDiv.classList.add("todo-main-div");
    
                    const checkHeader = document.createElement("p");
                    checkHeader.textContent = "CHECKLISTS";
                    checkHeader.classList.add("todo-headers");
    
                    const checkPWrapper = document.createElement("div");
                    checkPWrapper.classList.add("todo-content-wrapper");
                    checkPWrapper.classList.add("check-wrapper");
    
                    todo.checklist.forEach((checklist, index) => {
                        const chkDiv = document.createElement("div");
                        chkDiv.classList.add("chk-div");
                        const status = document.createElement("p");
                        status.classList.add("chk-status");
    
                        if (checklist.status) {
                            status.textContent = "COMPLETED";
                            status.classList.add("completed");
                        } else {
                            status.textContent = "IN PROGRESS";
                            status.classList.add("in-progress");
                        }
    
                        const checkp = document.createElement("p");
                        checkp.classList.add("chkp");
                        let text = `${index + 1}. `;
    
                        for (let key in checklist) {
                            if (key === "text") text += checklist[key];
                            if (key === "quantity" && checklist[key] !== "") text += ` ${checklist[key]}x `;
                        }
    
                        checkp.textContent = text;
                        chkDiv.append(status, checkp);
                        checkPWrapper.appendChild(chkDiv);
                    })
    
                    checkDiv.append(checkHeader, checkPWrapper);
                    todoWrapper.append(checkDiv);
                }

                
            })
        }

        btnsDiv.append(editBtn, delBtn);
        h3Div.appendChild(h3);
        projectTitleDiv.append(h3Div, btnsDiv);
        mainDiv.append(projectTitleDiv, todoDiv);
        Dom.contentDiv.appendChild(mainDiv);
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

export class Nav {
    static showProjects() {
        const projectDiv = document.querySelector("#nav-projects");
        projectDiv.innerHTML = "";

        Projects.list.forEach(project => {
            const div = document.createElement("div");
            const p = document.createElement("p");
            const a = document.createElement("a");
            a.textContent = project;
            a.href = "";
            a.classList.add("project-link");
            p.appendChild(a);
            div.appendChild(p);
            projectDiv.appendChild(div);
        })
    }

    static highlightDirectory(event) {
        const nav = document.querySelector("nav");
        const allLinksUnderNav = nav.querySelectorAll("a");

        if (event.target.matches("a")) {
            event.preventDefault();
            const title = event.target.textContent;

            Array.from(allLinksUnderNav).forEach(link => {
                const closestDiv = link.closest("div");
                if (title === link.textContent) {
                    closestDiv.classList.add("nav-location");
                } else {
                    closestDiv.classList.remove("nav-location");
                }
            })
        }
    }
}