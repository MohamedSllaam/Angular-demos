import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Title } from '@angular/platform-browser';
import { dummyTasks } from '../dummy-tasks';
import { NewTaskComponent } from './new-task/new-task.component';
import { NewTaskData } from './new-task/new-task.model';
import { TaskService } from './task.service';
@Component({
  selector: 'app-tasks',
  //imports: [TaskComponent, NewTaskComponent],
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
  tasks = dummyTasks;
  isAddingTask = false;

  constructor(private taskService: TaskService) {}
  get selectedTasks() {
    return this.taskService.getUserTasks(this.userId);
  }
  // onCompleteTask(id: string) {
  //   this.tasks = this.tasks.filter((task) => {
  //     task.id !== id;
  //   });
  // }

  onStartAddTask() {
    this.isAddingTask = true;
  }
  oncloseAddTask() {
    this.isAddingTask = false;
  }
  // onAddTask(taskData: NewTaskData) {
  //   this.taskService.addTaskDate(taskData, this.userId);
  //   this.isAddingTask = false;
  // }
}
