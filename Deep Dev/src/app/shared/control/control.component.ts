import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()',
  },
})
export class ControlComponent {
  private el = inject(ElementRef);
  // @HostBinding('class') className = 'control';
  @HostListener('click') onClick() {
    console.log('Clicked');
    console.log(this.el);
  }
  label = input.required<string>();
  // onClick() {
  //   console.log('Clicked');
  // }
}
