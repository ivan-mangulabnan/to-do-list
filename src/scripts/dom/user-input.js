export function passUserInput() {
    let userInput = [];
    const form = document.querySelector(".task-form");

    const project = getProject(form);
    const title = getTitle(form);
    const description = getDescription(form);
    const dueDate = getDuedate(form);
    const priority = getPriority(form);
    const notes = getNotes(form);
    const completionStatus = getCompletionStatus(form);
    const checklist = getCheckList(form);

    userInput.push(project, title, description, dueDate, priority, notes, completionStatus, checklist);

    return userInput;
}

// Passed variables below

function getProject(form) {
    const projectNode = form.querySelector("#project");
    const project = projectNode.value;

    return project;
}

function getTitle(form) {
    const titleNode = form.querySelector("#title");
    const title = titleNode.value;

    return title;
}

function getDescription(form) {
    const descriptionNode = form.querySelector("#description");
    const description = descriptionNode.value;

    return description;
}

function getDuedate(form) {
    const dueDateNode = form.querySelector("#dueDate");
    const dueDate = dueDateNode.value;

    return dueDate;
}

function getPriority(form) {
    const priorityNode = form.querySelector("#priority");
    const priority = priorityNode.value;

    return priority;
}

function getNotes(form) {
    const notesNode = form.querySelector("#notes");
    const notes = notesNode.value;

    return notes;
}

function getCompletionStatus(form) {
    const completionStatusNode = form.querySelector("#completionStatus");
    const completionStatus = completionStatusNode.checked ? true : false;

    return completionStatus;
}

function getCheckList(form) {
    let checklist = [];
    const checklistDiv = form.querySelector(".checklist-container");
    const checklistNodes = checklistDiv.querySelectorAll("div");

    if (!checklistNodes) return null;

    Array.from(checklistNodes).forEach(div => {
        const status = div.querySelector("input[type=checkbox]");
        const item = div.querySelector("input[type=text]");
        const quantity = div.querySelector("input[type=number]");

        const checklistObj = {};
        checklistObj["status"] = status.checked ? true : false;
        checklistObj["item"] = item.value;
        checklistObj["quantity"] =  quantity.value;
        checklist.push(checklistObj);
    })

    return checklist;
}