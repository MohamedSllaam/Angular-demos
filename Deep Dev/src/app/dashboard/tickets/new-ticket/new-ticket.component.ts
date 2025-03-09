import {
  AfterViewInit,
  Component,
  ElementRef,
  NgModule,
  OnInit,
  output,
  viewChild,
  ViewChild,
} from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  add = output<{ title: string; text: string }>();
  enteredTitle = '';
  enteredText = '';
  ngOnInit(): void {
    console.log('OnINIT');
    console.log(this.form()?.nativeElement);
  }
  ngAfterViewInit(): void {
    console.log('After View INIT');
    console.log(this.form()?.nativeElement);
  }
  // @ViewChild('form') form?: ElementRef<HTMLFormElement>;
  // onSubmit(titleInput: HTMLInputElement) {
  //   const enteredTitle = titleInput.value;
  //   console.log('Submitted');
  // }
  private form = viewChild<ElementRef<HTMLFormElement>>('form');
  onSubmit() {
    this.add.emit({ title: this.enteredTitle, text: this.enteredText });
    this.form()?.nativeElement.reset();
    this.enteredText = '';
    this.enteredTitle = '';
  }
  // onSubmit(titleInput: string, textInput: string, form: HTMLFormElement) {
  //   console.log(titleInput, textInput);
  //   form.reset();
  // }
}
