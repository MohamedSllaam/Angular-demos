import { JsonPipe } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-Login-Tempalte',
  standalone: true,
  templateUrl: './loginTempalte.component.html',
  styleUrl: './loginTempalte.component.css',
  imports: [FormsModule],
})
export class loginTempalteComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);
  constructor() {
    afterNextRender(() => {
      const SavedForm = window.localStorage.getItem('saved-login-form');

      if (SavedForm) {
        const loadedFormData = JSON.parse(SavedForm);
        const savedEmail = loadedFormData.email;
        setTimeout(() => {
          this.form().controls['email'].setValue(savedEmail);
        }, 1);
      }
      const subscription = this.form()
        .valueChanges?.pipe(debounceTime(500))
        .subscribe({
          next: (value) => {
            console.log(value.email);
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({ email: value.email })
            );
          },
        });

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      });
    });
  }
  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }
    const enteredEmsil = formData.form.value.email;
    const enteredPassword = formData.form.value.password;
    console.log(formData.form);
    formData.form.reset();
    console.log(enteredEmsil, enteredPassword);
  }
}
