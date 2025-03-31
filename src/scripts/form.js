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
        const checklistDiv = document.querySelector("#checklist-div");
        const checklists = Array.from(checklistDiv.querySelectorAll("[data-id]"));
        
        if (checklists.length === 0) {
            this.#input["checklist"] = null;
            return 
        }
    
        let checklistArr = [];
    
        checklists.forEach(checklist => {
            const textNode = checklist.querySelector(`input[type="text"]`);
            const text = textNode.value;
            const quantityNode = checklist.querySelector(`input[type="number"]`);
            const quantity = quantityNode.value;
            const statusNode = checklist.querySelector(`input[type="checkbox"]`);
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