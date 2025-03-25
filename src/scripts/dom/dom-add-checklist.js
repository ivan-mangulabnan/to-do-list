export function addDomChecklist() {
    const checklistDiv = document.querySelector(".checklist-container");
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const text = document.createElement("input");
    text.type = "text";

    const input = document.createElement("input");
    input.type = "number";

    div.append(checkbox, text, input);
    checklistDiv.appendChild(div);
}