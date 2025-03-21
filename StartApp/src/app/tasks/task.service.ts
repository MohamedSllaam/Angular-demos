import { Injectable } from '@angular/core';
import { dummyTasks } from '../dummy-tasks';
import { NewTaskData } from './new-task/new-task.model';
@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasks = dummyTasks;
  constructor() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }
  getUserTasks(userId: string) {
    return this.tasks.filter((t) => t.userId == userId);
  }
  addTaskDate(taskData: NewTaskData, userId: string) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
    this.saveTasks();
  }
  removeTask(id: String) {
    this.tasks = this.tasks.filter((task) => {
      task.id !== id;
    });
    this.saveTasks();
  }
  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
