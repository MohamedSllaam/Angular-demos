import { Component, OnInit } from '@angular/core';

import { CounterService } from '../counter.service';
import { Store } from '@ngrx/store';
// import { increment } from '../store/counter.action';
import { Observable } from 'rxjs';
import { decrement, increment } from '../store/counter.action';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css'],
})
export class CounterControlsComponent implements OnInit {
  count$!: Observable<Number>;
  count1=0 ;
  constructor(private counterService: CounterService , private store   :Store<{counter :number}>) {}
  ngOnInit(): void {
    this.count$ = this.store.select('counter');
   
    this.count$.subscribe({
      next: (x)=> this.count1= +x
    })
  }

  increment() {
    //this.store.dispatch(increment({value:2}));
    // this.store.dispatch(new IncrementAction(2));
    this.store.dispatch(increment({value:2}));
    console.log(this.count$);
   // this.counterService.increment();
  }

  decrement() {
    this.store.dispatch(decrement({value:2}));
    this.counterService.decrement();
  }
}
