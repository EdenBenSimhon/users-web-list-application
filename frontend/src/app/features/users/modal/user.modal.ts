import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { User } from '../state/user.model';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user.modal.html',
  styleUrl: './user.modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserModal implements OnInit {
  title: 'Create User' | 'Update User' = 'Create User';
  readonly updatedUser$ = new BehaviorSubject<boolean>(false); // BehaviorSubject for user data

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    job: new FormControl('', [Validators.required]),
  });

  constructor(
    public readonly dialogRef: MatDialogRef<UserModal>,

    @Inject(MAT_DIALOG_DATA)
    public data: { user: User; id: string }
  ) {
    if (data) {
      this.updatedUser$.next(true);
    }
  }

  ngOnInit(): void {
    if (this.data && this.data.user) {
      this.updatedUser$.next(true);
      this.title = 'Update User';
      this.userForm.patchValue({
        name: this.data.user.first_name,
        job: '',
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
