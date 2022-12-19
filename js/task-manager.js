export class TaskManager {
    //props:
    tasks = [];
    //methods:
    addTask(task) {
        this.tasks.push(task);
        localStorage.setItem("Task Manager", JSON.stringify(this.tasks));
    }
    removeTask(timeStamp) {
        let index = this.tasks.findIndex((t) => t.timeStamp === timeStamp);
        this.tasks.splice(index, 1);
        localStorage.setItem("Task Manager", JSON.stringify(this.tasks));
    }
    //updateTask
    updateTask(task) {
        let index = this.tasks.findIndex((t) => t.timeStamp === task.timeStamp);
        this.tasks.splice(index, 1, task);
    }
}
export let tm = new TaskManager();
