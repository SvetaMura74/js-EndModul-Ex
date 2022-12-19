import { Task } from "./tasks.js";
export class TaskManager {
  //props:
  tasks: Task[] = [];

  //methods:
 
  addTask(task: Task) {
    this.tasks.push(task);
    localStorage.setItem("Task Manager", JSON.stringify(this.tasks));
  }
  //delete//
  removeTask(timeStamp: string) {
    let index = this.tasks.findIndex((t) => t.timeStamp === timeStamp);
    this.tasks.splice(index, 1);
    localStorage.setItem("Task Manager", JSON.stringify(this.tasks));
  }
  //updateTask
  updateTask(task: Task) {
    let index = this.tasks.findIndex((t) => t.timeStamp === task.timeStamp);
    this.tasks.splice(index, 1, task);
  }
}

export let tm = new TaskManager();
