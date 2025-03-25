import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksComponent } from '../tasks.component';
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, TaskStatusOptionsProvider } from '../task.model';
import { TasksServiceToken } from '../../app.module';
// import { TasksServiceToken } from '../../../main';

@Component({
  selector: 'app-tasks-list',
  standalone: false,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',

  providers: [TaskStatusOptionsProvider],
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');
  private tasksService = inject(TasksServiceToken);
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'all':
        return this.tasksService.allTasks();
      case 'open':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService.allTasks().filter((task) => {
          task.status === 'IN_PROGRESS';
        });
      case 'done':
        return this.tasksService.allTasks().filter((task) => {
          task.status === 'DONE';
        });
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
