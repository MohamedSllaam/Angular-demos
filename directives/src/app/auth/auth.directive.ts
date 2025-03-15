import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' });
  private authService = inject(AuthService);
  private templateReR = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        console.log('Show Element');
        this.viewContainerRef.createEmbeddedView(this.templateReR);
      } else {
        console.log('Do NOt Show ELEment');
        this.viewContainerRef.clear();
      }
    });
  }
}
