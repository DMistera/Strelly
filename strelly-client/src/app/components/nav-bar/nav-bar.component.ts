import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/User';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() appTitle: string;
  @Input() user: User|null;
  @Input() rawVersion: boolean;

  

  constructor(private router: Router, private authService: AuthService) { }

  logoutUser() {
    this.authService.logout().subscribe(
      () => {
        this.router.navigate(['/auth']);
      },
      err => {
        alert("Nie wylogowano");
        console.error(err);
      }
    );
  }
}
