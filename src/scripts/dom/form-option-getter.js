import { Projects } from "../projects.js";
import { Priorities } from "../priorities.js";

export function loadFormOptions() {
    projectOptionLoad();
    priorityOptionLoad();
}

function projectOptionLoad() {
    const projectNode = document.querySelector("#project");
    Projects.list.forEach(project => {
        const optionNode = document.createElement("option");
        optionNode.textContent = project;
        projectNode.appendChild(optionNode);
    })
}

function priorityOptionLoad() {
    const prioritiesNode = document.querySelector("#priority");
    Priorities.list.forEach(priority => {
        const optionNode = document.createElement("option");
        optionNode.textContent = priority;
        prioritiesNode.appendChild(optionNode);
    })
}