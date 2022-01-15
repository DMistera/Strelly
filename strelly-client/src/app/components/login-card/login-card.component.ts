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
    if (this.userNameFormControl.invalid || this.passwordFormControl.invalid) return;
    this.loading = true;
    const userName = this.userNameFormControl.value;
    const password = this.passwordFormControl.value;

    this.authService.login(userName, password).subscribe(data => {
      this.router.navigate(['home']);
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
      this.userNameFormControl.setErrors({'password': messages.join(' ')});
      this.passwordFormControl.setErrors({'password': messages.join(' ')});
    }
    if (field === 'username') {
      this.userNameFormControl.setErrors({'username': messages.join(' ')});
    }
  }

}
