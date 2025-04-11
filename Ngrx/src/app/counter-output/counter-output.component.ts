import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';

import { CounterService } from '../counter.service';
import { Store } from '@ngrx/store';
import { selectCount, selectDoubleCount } from '../store/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnInit {
  counter = 0;
  counterServiceSub?: Subscription;
  count$! : Observable<Number>;
  doubleCount$! : Observable<Number>;
  constructor( private store :Store<{counter :number}>

  ) {
 
  //this.count$.subscribe();
  }

  ngOnInit(): void {
    // this.count$ = this.store.select('counter');
     this.count$ = this.store.select(selectCount);
    this.doubleCount$ = this.store.select(selectDoubleCount);
    console.log(this.count$);
   // this.count$= this.store.select(state => state.counter);
  } 

   
}
