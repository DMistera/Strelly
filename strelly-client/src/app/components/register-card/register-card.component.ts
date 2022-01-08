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
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  userNameFormControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  openSnackBar() {
    this.snackBar.open('Registered', 'OK', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  onSubmit() {
    const userName = this.userNameFormControl.value;
    const password = this.passwordFormControl.value;
    const email = this.emailFormControl.value;
    console.log({userName, password, email});

    this.authService.register(userName, email, password).subscribe(data => {
      this.openSnackBar();
    })
  }

}
