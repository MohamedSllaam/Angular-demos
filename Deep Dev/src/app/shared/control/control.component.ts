import {
  AfterContentInit,
  Component,
  contentChild,
  ContentChild,
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
export class ControlComponent implements AfterContentInit {
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
    console.log(this.control);
  }
  private el = inject(ElementRef);
  @ContentChild('input') private control?: ElementRef<
    HTMLInputElement | HTMLAreaElement
  >;
  private control2 =
    contentChild<ElementRef<HTMLInputElement | HTMLAreaElement>>('input');
  // @HostBinding('class') className = 'control';

  @HostListener('click') onClick() {
    console.log('Clicked');
    console.log(this.el);
    console.log(this.control);
  }

  label = input.required<string>();
  // onClick() {
  //   console.log('Clicked');
  // }
}
