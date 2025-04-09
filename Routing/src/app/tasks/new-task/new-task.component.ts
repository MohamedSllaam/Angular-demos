import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted= signal(false);
  private tasksService = inject(TasksService);
 private router = inject(Router);
  onSubmit() {
    this.submitted.set(false);
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
     console.log(this.tasksService.allTasks());
     this.router.navigate(['/users' , this.userId() , 'tasks'] )
  }
}

export const canLeaveEditPage:CanDeactivateFn<NewTaskComponent> = (component) =>{
  if(component.submitted()){
    return true;
  }
  if(component.enteredTitle() || component.enteredDate() || component.enteredDate() || component.enteredSummary()){
  return window.confirm('Do you really want to Leave ?  You wikk lose the entered data');
 }
 return true;
};