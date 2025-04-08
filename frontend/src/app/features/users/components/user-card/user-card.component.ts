import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../state/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() user!: User; // Define the type of user based on your application
  getUserDetails() {}
}
