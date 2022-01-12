import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent {
  userNameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  loading = false;

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit() {
    if(!this.userNameFormControl.valid || !this.passwordFormControl.valid) return;
    this.loading = true;
    const userName = this.userNameFormControl.value;
    const password = this.passwordFormControl.value;
    console.log({userName, password});

    this.authService.login(userName, password).subscribe(data => {
      // this.loading = false;
      this.router.navigate(['home']);
    },
    errors => {
      this.loading = false;
      for(let error of errors) {
        console.error(error);
        this.handleError(error?.key, error?.message)
      }
    })
  }

  handleError(ker: string, message: string) {
    this.userNameFormControl.setErrors({'validation': message});
    this.passwordFormControl.setErrors({'validation': message});
  }

}
