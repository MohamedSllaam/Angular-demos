import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-server-status',
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
  host: {
    class: 'status',
  },
})
export class ServerStatusComponent implements OnInit {
  // currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  currentStatus = signal<'online' | 'offline' | 'unknown'>('online');
  private destroyRef = inject(DestroyRef);
  constructor() {
    effect(() => {
      console.log(this.currentStatus());
    });
    console.log(this.currentStatus());
  }

  ngOnInit() {
    const interval = setInterval(() => {
      const rnd = Math.random();
      if (rnd > 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);
    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }
}
