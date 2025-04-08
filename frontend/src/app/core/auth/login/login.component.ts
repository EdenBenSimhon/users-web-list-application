import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly _router: Router
  ) {}
  loginForm = new FormGroup({
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
    const { username, password } = this.loginForm.value;
    const isLoggedIn = await firstValueFrom(
      this.authService.login(username, password)
    );
    if (isLoggedIn) {
      this._router.navigate(['/users']);
    } else {
      alert('Invalid credentials');
    }
  }
}
