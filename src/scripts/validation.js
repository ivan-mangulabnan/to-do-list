export class Validation {
    static notEmpty(input) {
        const trimmedInput = input.trim();
        const notEmpty = /^(?!\s+$).+$/;
        return notEmpty.test(trimmedInput);
    }
}