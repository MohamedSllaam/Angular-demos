import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  output,
  Output,
} from '@angular/core';
import { DUMMY_USERS } from '../dummy-users';
import { IUser } from './user.model';
import { CardComponent } from '../shared/card/card.component';
const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: false,
  //imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  // @Input({ required: true }) id!: string;
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  // // @Output() select = new EventEmitter();
  @Input({ required: true }) user!: IUser;
  @Input({ required: true }) selected!: boolean;
  select = output<string>();
  // avatar = input.required<string>();
  // name = input.required<string>();

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }
  // imagePath = computed(() => {
  //   return 'assets/users/' + this.avatar();
  // });
  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
