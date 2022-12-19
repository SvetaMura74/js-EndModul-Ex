import { Utils } from "./utils.js";
export class Task {
    description;
    status;
    timeStamp = Utils.currentDateString();
    constructor(description, status) {
        this.description = description;
        this.status = status;
    }
    toString() {
        return `description: ${this.description} status: ${this.status}`;
    }
}
