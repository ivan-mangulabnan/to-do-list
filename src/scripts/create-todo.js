import { Form } from "./form.js"; 
import { Todos } from "./todos.js";

export function saveTodo() {
    const input =  Form.input;
    Todos.list.push(new Todos(input));
    Todos.archive.push(new Todos(input));
}