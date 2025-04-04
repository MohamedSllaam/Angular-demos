import { Component } from '@angular/core';

import { loginTempalteComponent } from './auth/loginTempalte/loginTempalte.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [loginTempalteComponent],
})
export class AppComponent {}
