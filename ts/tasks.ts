import { Utils } from "./utils.js";
import { Status } from "./status.js";
export class Task {
  description: string;
  status?: Status;
  timeStamp = Utils.currentDateString();
  constructor(description: string, status?: Status.Uncompleted) {
    this.description = description;
    this.status = status;
  }
  toString() {
    return `description: ${this.description} status: ${this.status}`;
  }
}
