export class Task {
  constructor(id, name, description, dueDate, priority, category, status) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = parseInt(priority);
    this.category = category;
    this.status = status;
  }
}
