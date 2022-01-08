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

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit() {
    const userName = this.userNameFormControl.value;
    const password = this.passwordFormControl.value;
    console.log({userName, password});

    this.authService.login(userName, password).subscribe(data => {
      this.router.navigate(['home']);
    })
  }

}
