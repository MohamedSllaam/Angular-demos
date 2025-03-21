import { Component, effect, Input, signal } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { DUMMY_USERS } from './dummy-users';
// import { DUMMY_USERS } from '../dummy-users';
import { NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, Observer, ReplaySubject, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: false,
  //imports: [HeaderComponent, UserComponent, TasksComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;
  count = signal(0);
  SelectedUserId = 'u1';

  get selectedUser() {
    return this.users.find((user) => user.id === this.SelectedUserId)!;
  }

  constructor() {
    // Log changes to the count signal
    effect(() => {
      console.log('Count updated:', this.count());
    });
  }
  onSelectUser(id: string) {
    console.log('Selected user with id ' + id);
    this.SelectedUserId = id;
  }

  increment() {
    this.count.update((value) => value + 1); // Update the signal
  }

  observer = {
    next: (value: any) => console.log('Received value:', value),
    error: (err: any) => console.error('Error:', err),
    complete: () => console.log('Completed'),
  };
  AsncStream(observer: any) {
    var t1 = setInterval(() => {
      observer.next(Math.random() * 1000);
    }, 1000);
  }
  b = Observable.create(this.AsncStream);

  observable = new Observable((subscriber) => {
    subscriber.next(1);
    console.log('Error:', 'sallam');
    subscriber.next(2);
    subscriber.next(2);
    subscriber.next(2);
    subscriber.complete();
  });
  // Subscribe to the Observable
  subject = new BehaviorSubject<number>(1);
  replaySubject = new ReplaySubject<number>(2); // Replays last 2 values
  currentUser$ = this.subject.asObservable();

  subscribe() {
    this.b
      .pipe(
        map((value: any) => value * 50000), // Transforms each value
        filter((value: any) => value > 5) // Filters values greater than 5
      )
      .subscribe((res: any) => {
        console.log(res);
      });
    // this.observable.subscribe(this.observer);
    // console.log('observable');
    // this.observer.next(1000);
    let count = 1;
    this.subject.subscribe(
      (value: number) => {
        console.log('Observer 1:', value, 'count' + count++);
      },
      (Error) => console.error('Error', Error)
    );
    this.subject.next(1); // Emits 1 to all subscribers
    //this.subject.next(2); // Emits 1 to all subscribers
    // this.replaySubject.next(2); // Emits 2 to all subscribers
    // this.subject.error('Error Allsa'); // Emits 2 to all subscribers
  }
}
