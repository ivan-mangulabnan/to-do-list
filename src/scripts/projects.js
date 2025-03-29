export class Projects {
    static #list = ["Default"];

    static get list() {
        return Projects.#list;
    }

    static set list(FormList) {
        if (Projects.#list.includes(FormList["project"])) return; // Checks for duplication.
        Projects.#list.push(FormList["project"]);
    }

    static add(proj) {
        let project = {};
        project.project = proj;
        Projects.list = project;
    }
}