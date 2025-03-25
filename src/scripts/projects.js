import { Todos } from "./todo.js";

export class Projects {
    static list = ["Default", "Shopping", "Random"];
}


//DOM

export function homeInterface() {
    const contentDiv = document.querySelector("div");

    if (Todos.list.length === 0) {
        contentDiv.classList.add(`no-task`);
        const p = document.createElement(`p`);
        p.textContent = "No Pending Task";
        contentDiv.appendChild(p);
        return
    }

    const showProjects = () => {
        contentDiv.classList.add(`home`);
        contentDiv.innerHTML = "";

        Projects.list.forEach(project => {
            const projectDiv = document.createElement(`div`);
            const projectName = document.createElement(`h2`);
            projectName.textContent = project;
            projectName.classList.add(`project-name`);
            projectDiv.appendChild(projectName);
            contentDiv.appendChild(projectDiv);
        })
    }

    const showTasks = (taskObj) => {
        const taskDiv = document.createElement(`div`);
        const title = document.createElement(`p`);
        title.textContent = taskObj.title;
        const description = document.createElement(`p`);
        description.textContent = taskObj.description;
        taskDiv.append(title, description);
    }

    showProjects();
}