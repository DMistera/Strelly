import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Input() appTitle: string;

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
