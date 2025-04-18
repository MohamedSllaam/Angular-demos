import { Component, ElementRef, Inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../app.module';
// import { TasksServiceToken } from '../../../main';

@Component({
  selector: 'app-new-task',
  standalone: false,

  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  constructor(@Inject(TasksServiceToken) private tasksService: TasksService) {}
  onAddTask(title: string, description: string) {
    this.tasksService.addTasks({ title, description });
    this.formEl()?.nativeElement.reset();
  }
}
