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
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);//, Validators.minLength(6)]);
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
    if(!this.userNameFormControl.valid || !this.passwordFormControl.valid || !this.emailFormControl.valid) return;
    this.loading = true;
    const userName = this.userNameFormControl.value;
    const password = this.passwordFormControl.value;
    const email = this.emailFormControl.value;
    console.log({userName, password, email});

    this.authService.register(userName, email, password).subscribe(data => {
      this.openSnackBar();
      this.loading = false;
    },
    errors => {
      this.loading = false;
      console.log({errors});
      for(let error in errors) {

        console.log([error, errors[error]]);
      }
      // this.handleError(error?.key, error?.message)
    })
  }

  handleError(ker: string, message: string) {
    this.userNameFormControl.setErrors({'validation': message});
    this.passwordFormControl.setErrors({'validation': message});
    this.emailFormControl.setErrors({'validation': message});
  }

}
