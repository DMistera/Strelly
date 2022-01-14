import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss']
})
export class RegisterCardComponent {
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  userNameFormControl = new FormControl('', [Validators.required]);
  loading = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  openSnackBar() {
    this.snackBar.open('Registered', 'OK', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  onSubmit() {
    if(this.userNameFormControl.invalid || this.passwordFormControl.invalid) return;
    this.loading = true;
    const userName = this.userNameFormControl.value;
    const password = this.passwordFormControl.value;

    this.authService.register(userName, password).subscribe(() => {
      this.loading = false;
      this.openSnackBar();
      this.resetForm();
    },
    errors => {
      this.loading = false;
      for(let field in errors) {
        this.handleError(field, errors[field]);
      }
    })
  }

  handleError(field: string, messages: string[]) {
    if (field === 'password') {
      this.passwordFormControl.setErrors({'password': messages.join(' ')});
    }
    if (field === 'username') {
      this.userNameFormControl.setErrors({'username': messages.join(' ')});
    }
  }

  resetForm() {
    this.userNameFormControl.reset();
    this.userNameFormControl.setErrors(null);
    this.passwordFormControl.reset();
    this.passwordFormControl.setErrors(null);
  }

}
