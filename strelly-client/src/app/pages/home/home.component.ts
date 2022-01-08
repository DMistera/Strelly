import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User|null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userObservable.subscribe(user => {
      this.user = user;
    })
  }

}
