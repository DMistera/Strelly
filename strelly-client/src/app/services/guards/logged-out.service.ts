import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.isUserLoggedIn().pipe(map(data => {
      console.log({'logged-out guard': data});
      if (data) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }));

  }
}
