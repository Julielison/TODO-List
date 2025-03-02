import { Task } from "./task.js";

export const tasks = [];
export let editingTaskId = null;

export function addTask(name, description, dueDate, priority, category, status) {
  const id = Date.now();
  const newTask = new Task(id, name, description, dueDate, priority, category, status);
  tasks.push(newTask);
  return newTask;
}

export function updateTask(id, name, description, dueDate, priority, category, status) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.name = name;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = parseInt(priority);
    task.category = category;
    task.status = status;
  }
}

export function setEditingTaskId(id) {
  editingTaskId = id;
}

export function removeTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index > -1) {
    tasks.splice(index, 1);
  }
}
