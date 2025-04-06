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

            filteredTodos.forEach((todo, index) => {

                const todoWrapper = document.createElement("div");
                todoWrapper.setAttribute("data-id", todo.id);
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

                const btnDiv = document.createElement("div"); // ButtonDiv starts Here
                btnDiv.classList.add("btn-div");
                
                const completionDiv = document.createElement("div");
                completionDiv.classList.add("completion-div");

                const chkbox = document.createElement("input");
                chkbox.classList.add("chkbox");
                chkbox.type = "checkbox";
                chkbox.id = `complete${index + 1}`;
                chkbox.disabled = true;

                if (todo.completionStatus) {
                    chkbox.checked = true;
                }

                const label = document.createElement("label");
                label.classList.add("mark");
                label.textContent = "MARK AS COMPLETE";
                label.htmlFor = `complete${index + 1}`;

                completionDiv.append(chkbox, label);
                
                const editDelDiv = document.createElement("div");
                editDelDiv.classList.add("mod-rmv-div");
                const modBtn = document.createElement("button");
                modBtn.classList.add("editButton");
                modBtn.classList.add("modify-button");
                const rmvBtn = document.createElement("button");
                rmvBtn.classList.add("delButton");
                rmvBtn.classList.add("remove-button");

                editDelDiv.append(modBtn, rmvBtn);

                btnDiv.append(completionDiv, editDelDiv);
                todoWrapper.append(btnDiv);
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
            option.value = project;
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
            todoDiv.setAttribute("data-id", todo.id);
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
            editButton.classList.add("modify-button");
            const delButton = document.createElement("button");
            delButton.classList.add("delButton");
            delButton.classList.add("remove-button");

            buttonsDiv.append(editButton, delButton);
            todoDiv.append(colorDiv, title, buttonsDiv);
            allTodosDiv.appendChild(todoDiv);
        })
    }

    static editTodoDisplay(target) {
        const todo = target.closest("[data-id]");
        const todoId = todo.getAttribute("data-id");
        
        const targetTodo = Todos.list.filter(todo => todo.id === todoId).shift(); // filters the array then takes out the first item.

        const dialog = document.createElement("dialog");
        dialog.classList.add("edit-dialog");
        document.body.appendChild(dialog);

        const form = document.createElement("form");
        form.classList.add("edit-form");
        dialog.appendChild(form);

        const editMainDiv = document.createElement("div");
        editMainDiv.classList.add("edit-main-div");
        form.appendChild(editMainDiv);

        const id = document.createElement("input");
        id.type = "hidden";
        id.id = "ed-id";
        id.value = targetTodo.id;
        editMainDiv.appendChild(id);

        function createSection(editMainDiv, propertyName, propertyValue) {
            const div = document.createElement("div");
            div.classList.add("edit-section-div");
            const header = document.createElement("p");
            header.classList.add("edit-header");

            if (propertyName === "completionStatus") {
                header.textContent = "COMPLETION STATUS";
            } else {
                header.textContent = propertyName.toUpperCase();
            }

            const itemDiv = document.createElement("div");
            itemDiv.classList.add("edit-item-div");

            if (propertyName === "priority" || propertyName === "project") {
                let optionArr;
                const item = document.createElement("select");
                if (propertyName === "priority") {
                    optionArr = Priority;
                    item.id = "ed-priority";
                }
                if (propertyName === "project") {
                    item.id = "ed-project";
                    div.classList.add("edit-project");
                    const addbtn = FormDom.addButton(div);
                    addbtn.classList.add("edit-add-proj");
                    const newProj = FormDom.createProjectAdder(div);
                    newProj.classList.add("edit-new-proj");
                    optionArr = Projects;
                }

                optionArr.list.forEach(opt => {
                    const option = document.createElement("option");
                    option.textContent = opt;
                    option.value = opt;
                    item.appendChild(option);
                })

                item.classList.add("edit-item-select");
                item.value = propertyValue;
                itemDiv.appendChild(item);

            } else if (propertyName === "description" || propertyName === "notes") {
                const item = document.createElement("textarea");
                if (propertyName === "description") {
                    item.id = "ed-description";
                }
                if (propertyName === "notes") {
                    item.id = "ed-notes";
                }
                item.classList.add("edit-item-textarea");
                item.value = propertyValue;
                itemDiv.appendChild(item);

            } else if (propertyName === "checklist") {
                div.classList.add("edit-checklist");
                const plus = FormDom.addButton(div);
                plus.classList.add("checklist-plus");
                const itemInnerDiv = document.createElement("div");
                const entityDiv = document.createElement("div");
                entityDiv.classList.add("checklist-entity-div");
                const p1Div = document.createElement("div");
                const p1 = document.createElement("p");
                p1.textContent = "STATUS";
                p1Div.appendChild(p1);
                const p2Div = document.createElement("div");
                const p2 = document.createElement("p");
                p2.textContent = "ITEM";
                p2Div.appendChild(p2);
                const p3Div = document.createElement("div");
                const p3 = document.createElement("p");
                p3.textContent = "QTY.";
                p3Div.appendChild(p3);
                entityDiv.append(p1Div, p2Div, p3Div);

                const checkDiv = document.createElement("div");
                checkDiv.classList.add("checklist-chkdiv");

                if (propertyValue !== null) {
                    propertyValue.forEach(checklist => {
                        FormDom.utilChecklist(checkDiv, checklist.status, checklist.text, checklist.quantity);
                    })
                }

                itemInnerDiv.append(entityDiv, checkDiv);
                itemDiv.appendChild(itemInnerDiv);

            } else if (propertyName === "completionStatus") {
                itemDiv.classList.add("edit-completion-div");
                const item = document.createElement("input");
                item.id = "ed-complete";
                item.classList.add("edit-completion-status");
                const label = document.createElement("p");
                label.classList.add("edit-completion-label");
                item.type = "checkbox";
                if (propertyValue === true) item.checked = true;
                label.textContent = item.checked ? "COMPLETED" : "NOT YET COMPLETED";
                itemDiv.append(item, label);
            } else {
                const item = document.createElement("input");

                if (propertyName === "dueDate") {
                    item.type = "date";
                    item.classList.add("edit-item-date");
                    item.id = "ed-dueDate";
                }

                if (propertyName === "title") {
                    item.type = "text";
                    item.id = "ed-title";
                }

                item.classList.add("edit-item-input");
                item.value = propertyValue;
                itemDiv.appendChild(item);
            }

            div.append(header, itemDiv);
            editMainDiv.appendChild(div);
        }

        for (let key in targetTodo) {
            if (key !== "id") {
                createSection(editMainDiv, key, targetTodo[key]);
            }
        }

        const btnDiv = document.createElement("div");
        btnDiv.classList.add("edit-btn-div");
        const approveBtn = document.createElement("button");
        approveBtn.classList.add("edit-aprv-btn");
        approveBtn.textContent = "✔";
        approveBtn.type = "button";
        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("edit-rmv-btn");
        cancelBtn.textContent = "✖";
        cancelBtn.type = "button";
        btnDiv.append(approveBtn, cancelBtn);
        editMainDiv.appendChild(btnDiv);

        dialog.showModal();

    }

    static updateTodo(targetID) {
        const todo = Todos.list.find(item => item.id === targetID);

        const project = document.querySelector("#ed-project");
        todo.project = project.value;

        const title = document.querySelector("#ed-title");
        todo.title = title.value;

        const description = document.querySelector("#ed-description");
        todo.description = description.value;

        const dueDate = document.querySelector("#ed-dueDate");
        todo.dueDate = dueDate.value;

        const priority = document.querySelector("#ed-priority");
        todo.priority = priority.value;

        const notes = document.querySelector("#ed-notes");
        todo.notes = notes.value;

        const checklistArr = Array.from(document.querySelectorAll(".checklist-single-div"));
        if (checklistArr.length === 0) {
            todo.checklist = null;
        } else {
            let arrContainer = [];
            checklistArr.forEach(container => {
                const stats = container.querySelector('input[type="checkbox"]');
                const status = stats.checked;
                const text = container.querySelector('input[type="text"]').value;
                const quantity = container.querySelector('input[type="number"]').value;
                if (!Validation.notEmpty(text)) return;
                arrContainer.push({text, quantity, status});
            })

            if (arrContainer.length === 0) {
                todo.checklist = null;
            } else {
                todo.checklist = arrContainer;
            }
        }

        const completionStatus = document.querySelector("#ed-complete");
        todo.completionStatus = completionStatus.checked;


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
        Dom.hideProjectAdder();
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
       localStorage.setItem("project", JSON.stringify(Projects.list));
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

    static utilChecklist(parentDiv, stat, text, quantity) {
        const singleChkDiv = document.createElement("div");
        singleChkDiv.classList.add("checklist-single-div");
        const statusDiv = document.createElement("div");
        const status = document.createElement("input");
        status.type = "checkbox";
        if (stat === true) status.checked = true;
        statusDiv.appendChild(status);
        const itemDiv = document.createElement("div");
        const item = document.createElement("input");
        item.type = "text";
        item.value = text;
        itemDiv.appendChild(item);
        const qtyDiv = document.createElement("div");
        const qty = document.createElement("input");
        qty.type = "number";
        qty.value = quantity;
        const delDiv = document.createElement("div");
        const delBtn = document.createElement("button");
        delBtn.textContent = "✖";
        delBtn.type = "button";
        delBtn.classList.add("rmv-btn");

        delDiv.appendChild(delBtn);
        qtyDiv.appendChild(qty);
        singleChkDiv.append(statusDiv, itemDiv, qtyDiv, delDiv);
        parentDiv.appendChild(singleChkDiv);
    }

    static addButton(parentElement) {
        const button = document.createElement("button");
        button.textContent = "✚";
        button.type = "button";
        parentElement.appendChild(button);
        return button;
    }

    static createProjectAdder(parentElement) {
        const mainContainer = document.createElement("div");
        const inputContainer = document.createElement("div");
        const para = document.createElement("p");
        para.textContent = "NEW PROJECT";
        const input = document.createElement("input");
        input.classList.add("plus-proj-input");
        input.type = "text";
        const btnContainer = document.createElement("div");
        const addBtn = document.createElement("button");
        addBtn.classList.add("plus-proj");
        addBtn.textContent = "ADD";
        addBtn.type = "button";

        inputContainer.append(para, input);
        btnContainer.appendChild(addBtn);
        mainContainer.append(inputContainer, btnContainer);
        parentElement.appendChild(mainContainer);
        return mainContainer;
    }

    static createDialogForProject(h3) {
        const dialog = document.createElement("dialog");
        dialog.classList.add("project-dialog");

        const form = document.createElement("form");
        dialog.appendChild(form);

        const container = document.createElement("div");
        const label = document.createElement("label");
        label.htmlFor = "up-project";
        label.textContent = "EDIT PROJECT";

        const input = document.createElement("input");
        input.type = "text";
        input.value = h3;

        const btnDiv = document.createElement("div");
        const approve = document.createElement("button");
        approve.classList.add("up-btn");
        const cancel = document.createElement("button");
        cancel.classList.add("x-btn");
        approve.type = "button";
        approve.textContent = "✔";
        cancel.type = "button";
        cancel.textContent = "✖";

        btnDiv.append(approve, cancel);
        container.append(label, input);

        form.append(container, btnDiv);
        dialog.appendChild(form);
        document.body.appendChild(dialog);
        dialog.showModal();
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