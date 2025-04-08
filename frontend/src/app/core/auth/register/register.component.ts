import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  constructor(private readonly authService: AuthService) {}
  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  async onSubmit() {
    const { username, password } = this.registerForm.value;
    const isLoggedIn = await firstValueFrom(
      this.authService.login(username, password)
    );
    if (isLoggedIn) {
    } else {
      alert('Invalid credentials');
    }
  }
}
