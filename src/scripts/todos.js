export class Todos {
    static list = [];
    static archive = [];

    constructor(formInput) {
        for (let key in formInput) {
            this[key] = formInput[key];
        }
    }

    static isEmpty() {
        return Todos.list.length === 0 ? true : false;
    }

    static getProjectsWithTodo() {
        return [...new Set(Todos.list.map(todo => todo.project))]; // gets project in each todo, then removes duplicate.
    }
}