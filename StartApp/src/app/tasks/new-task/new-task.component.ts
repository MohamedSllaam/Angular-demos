import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
  standalone: false,
})
export class NewTaskComponent {
  @Output() close = new EventEmitter<void>();
  @Input({ required: true }) userId!: string;
  //@Output() Add = new EventEmitter<NewTaskData>();
  private taskService = inject(TaskService);
  enteredTitle = '';
  enteredSummary = '';
  enteredDate = '';

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    // console.log('sallam');
    //this.Add.emit();
    this.taskService.addTaskDate(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        date: this.enteredDate,
      },
      this.userId
    );
    this.close.emit();
  }
}
