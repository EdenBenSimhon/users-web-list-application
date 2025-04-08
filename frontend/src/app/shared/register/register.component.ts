import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  constructor(private readonly _sharedService: SharedService) {}
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
    const created = await firstValueFrom(
      this._sharedService.register(username, password)
    );
    if (created) {
      alert('User created successfully');
    } else {
      alert('User already exists');
    }
    this.registerForm.reset();
  }
}
