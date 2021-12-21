import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { User } from '@app/models';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  }),
  observe: 'response' as const
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User|null>;
  public user: Observable<User|null>;
  public userLoggedIn: boolean;

  constructor(private http: HttpClient) { 
    this.userLoggedIn = false;
    this.userSubject = new BehaviorSubject<User|null>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
    this.userLoggedIn = this.isUserLoggedIn;
  }

  public get isUserLoggedIn(): boolean {
    return this.user!=null;
  }


  login(userName: string, password: string) {
    return this.http.post<any>(
      `/api/Users/Login`,
      {"userName": userName, "password": password}, 
      HTTP_OPTIONS
    ).pipe(
      map(data => {
        console.log("Login status code:", data.status)
        if(data.status == 200){
          this.userLoggedIn = true;
          return this.getUserData().subscribe(
            data => {
              console.log("userData: ");
              console.log(data);
              var tempUser = new User(data.body);
              localStorage.setItem('user',  JSON.stringify(tempUser));
              this.userSubject.next(tempUser);
            },
            err => {
              console.log(err);
            }
          );
        }
        return data;
      })
    );
  }

  register(userName: string, email: string, password: string) {
    return this.http.post<any>(
      '/api/Users/Register', 
      {"userName": userName, "email": email, "password": password},
      HTTP_OPTIONS
    ).pipe(
      map(data => {
      console.log("Register status code:", data.status)
      console.log("Register", data)
      return data;
    }));
  }

  logout() {
    return this.http.delete<any>('/api/Users/Logout', HTTP_OPTIONS).pipe(map(data => {
      console.log(data);
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.userLoggedIn = false;
      return data;
    }));
  }

  getUserData(): Observable<HttpResponse<any>>{
    return this.http.get<any>(`/api/Users/`, HTTP_OPTIONS).pipe(map(data => {
      console.log("UserInfo status code:", data.status)
      if(data.status == 200){
        this.userLoggedIn = true;
      }
      else{
        this.userLoggedIn = false;
      }
      return data;
    }));
  }
}
