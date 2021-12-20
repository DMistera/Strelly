import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { AuthService } from '@app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User|null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(){
    let userName = "TwojaStara123";
    let password = "#TwojaStara123";
    this.authService.login(userName, password).subscribe(
      // {
      //   next: (data)=>{
      //     data.subscribe()
      //     console.log(typeof(data))
      //     // if(typeof(data) != Subscription){

      //     // }
      //     console.log("onData")
      //     console.log(data);
      //     this.user = new User(data);
      //     console.log(this.user);
      //   },
      //   complete: () => {},
      //   error: () => {}
      // }
      data => {
        this.authService.user.subscribe(x =>{
        this.user = new User(x);
        });
      },
      error => {
        console.log("error")
        console.log(error);
      }
    );
  }

  registerUser(){
    let userName = "TwojaStara123";
    let email = "TwojaStara123@google.com";
    let password = "#TwojaStara123";
    this.authService.register(userName, email, password).subscribe(
      data => {
        // alert("Zarejestrowano");
        console.log(data);
      },
      error => {
        alert("Nie zarejestrowano: "+error.error.title);
        console.log(error.error.title);
      }
    );
  }

  logoutUser(){
    this.authService.logout().subscribe(
      data => {
        // alert("Wylogowano");
        this.user = null;
        console.log(data);
      },
      err => {
        alert("Nie wylogowano");
        console.log(err);
      }
    );
  }
}
