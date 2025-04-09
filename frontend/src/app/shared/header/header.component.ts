import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}
  @Output() addUserEvent = new EventEmitter<void>();

  logout() {
    this.authService.logout();
  }

  onAddUser() {
    this.addUserEvent.emit();
  }
}
