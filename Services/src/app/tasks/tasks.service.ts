import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();
  private loggingService = inject(LoggingService);
  addTasks(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    console.log(this.tasks);
    console.log(this.allTasks);
    console.log(taskData);

    this.loggingService.log('Added Task with title ' + taskData.title);
  }
  updateTaskStatus(TaskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === TaskId ? { ...task, status: newStatus } : task
      )
    );
  }
}
