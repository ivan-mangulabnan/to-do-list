import { Todos } from "./dom/todos.js";
import { Form } from "./dom/dom-nodes.js";
import { Projects } from "./projects.js";

export function saveTodo() {
    Todos.list.push(Form.input);
    Projects.list = Form.input;
}