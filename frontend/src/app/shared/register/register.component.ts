import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { SharedService } from '../service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  constructor(
    private readonly _sharedService: SharedService,
    private readonly _router: Router
  ) {}
  registerForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: this.passwordMatchValidator }
  );

  async onSubmit() {
    const { username, password } = this.registerForm.value;
    this._sharedService.register(username, password).subscribe({
      next: (created) => {
        if (created) {
          alert('User created successfully');
          this._router.navigate(['/login']);
        } else {
          alert('User already exists');
        }
        this.registerForm.reset();
      },
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
