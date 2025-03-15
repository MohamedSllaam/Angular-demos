import { Directive, ElementRef, inject, input } from '@angular/core';
import { LogDirective } from './log.directive';

@Directive({
  //selector: 'app-safe-link',
  selector: 'a[appSafeLink]',
  standalone: true,
  hostDirectives: [LogDirective],
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });
  queryParam2 = input('myapp');
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective');
  }
  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('do you want to leave the app?');

    if (wantsToLeave) {
      // const address = (event.target as HTMLAnchorElement).href;
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href =
        address + '?from=' + this.queryParam();
      return;
    }
    event.preventDefault();
  }
}
