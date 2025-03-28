export class Todos {
    static list = [];

    static isEmpty() {
        return Todos.list.length === 0 ? true : false;
    }

    editProperty(property) {
        this.property = property;
    }
}

// sample object: { project: "Content", title: "Ivan", description: "test", dueDate: "2025-10-12" }