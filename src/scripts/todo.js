import { TaskProperties } from "./task-properties.js";

export class Todos {
    static list = [
    {
        project: "Default",
        title: "test",
        description: "test",
        dueDate: "2025-03-19",
        priority: "Low Priority",
        notes: "test",
        completionStatus: false,
        checklist: [
            {
                status: false,
                item: "test",
                quantity: "1"
            }
        ]
    },
    {
        project: "Shopping",
        title: "test",
        description: "test",
        dueDate: "2025-03-19",
        priority: "Low Priority",
        notes: "test",
        completionStatus: false,
        checklist: [
            {
                status: false,
                item: "test",
                quantity: "1"
            }
        ]
    },
    {
        project: "Random",
        title: "test",
        description: "test",
        dueDate: "2025-03-19",
        priority: "Low Priority",
        notes: "test",
        completionStatus: false,
        checklist: [
            {
                status: false,
                item: "test",
                quantity: "1"
            }
        ]
    },
    {
        project: "Default",
        title: "test",
        description: "test",
        dueDate: "2025-03-19",
        priority: "Low Priority",
        notes: "test",
        completionStatus: false,
        checklist: [
            {
                status: false,
                item: "test",
                quantity: "1"
            }
        ]
    }
];
}

class Task {
    constructor(userInputArray) {
        TaskProperties.list.forEach((properties, index) => {
            this[properties] = userInputArray[index];
        })
    }
}

export function pushTask(userInputArray) {
    Todos.list.push(new Task(userInputArray));
}