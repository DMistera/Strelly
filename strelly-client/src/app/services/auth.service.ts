import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, AsyncSubject} from 'rxjs';
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
  private userSubject: AsyncSubject<User|null>;
  public userObservable: Observable<User|null>;
  private userLoggedInSubject: AsyncSubject<boolean>;
  private userLoggedInObservable: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.userLoggedInSubject = new AsyncSubject<boolean>();
    this.userSubject = new AsyncSubject<User|null>();
    this.userObservable = this.userSubject.asObservable();
    this.userLoggedInObservable = this.userLoggedInSubject.asObservable();
    this.getUserData().subscribe(
      data => { this.setUserData(data); },
      err => {
        console.error(err);
        this.userSubject.next(null);
        this.userSubject.complete();
        this.userLoggedInSubject.next(false);
        this.userLoggedInSubject.complete();
      }
    );
  }

  public isUserLoggedIn(): Observable<boolean> {
    return this.userLoggedInObservable;
  }

  login(userName: string, password: string) {
    this.userLoggedInSubject = new AsyncSubject<boolean>();
    this.userSubject = new AsyncSubject<User|null>();
    this.userObservable = this.userSubject.asObservable();
    this.userLoggedInObservable = this.userLoggedInSubject.asObservable();
    return this.http.post<any>(
      `/api/Users/Login`,
      {"userName": userName, "password": password},
      HTTP_OPTIONS
    ).pipe(
      map(data => {
        console.log({login: data.status})
        if(data.status == 200){
          return this.getUserData().subscribe(
            data => { this.setUserData(data); },
            err => { console.error(err); }
          );
        }
        return data;
      })
    );
  }

  register(userName: string, email: string, password: string) {
    this.userLoggedInSubject = new AsyncSubject<boolean>();
    this.userSubject = new AsyncSubject<User|null>();
    this.userObservable = this.userSubject.asObservable();
    this.userLoggedInObservable = this.userLoggedInSubject.asObservable();
    return this.http.post<any>(
      '/api/Users/Register',
      {"userName": userName, "email": email, "password": password},
      HTTP_OPTIONS
    ).pipe(
      map(data => {
      console.log({register: data.status, data: data})
      this.userSubject.next(null);
      this.userLoggedInSubject.next(false);
      this.userLoggedInSubject.complete();
      this.userSubject.complete();
      return data;
    }));
  }

  logout() {
    this.userLoggedInSubject = new AsyncSubject<boolean>();
    this.userSubject = new AsyncSubject<User|null>();
    this.userObservable = this.userSubject.asObservable();
    this.userLoggedInObservable = this.userLoggedInSubject.asObservable();
    return this.http.delete<any>('/api/Users/Logout', HTTP_OPTIONS).pipe(map(data => {
      console.log({logout: data.status});
      localStorage.removeItem('user');
      this.userSubject.next(null);
      this.userLoggedInSubject.next(false);
      this.userLoggedInSubject.complete();
      this.userSubject.complete();
      return data;
    }));
  }

  getUserData(): Observable<HttpResponse<any>>{
    return this.http.get<any>(`/api/Users/`, HTTP_OPTIONS).pipe(map(data => {
      console.log({getUserData: data.status})
      if(data.status == 200){
        this.userLoggedInSubject.next(true);
        this.userLoggedInSubject.complete();
      }
      else{
        this.userLoggedInSubject.next(false);
        this.userLoggedInSubject.complete();
      }
      return data;
    }));
  }

  setUserData(data: any) {
    console.log({setUserData: data.body});
    const tempUser = new User(data.body);
    localStorage.setItem('user', JSON.stringify(tempUser));
    this.userSubject.next(tempUser);
    this.userSubject.complete();
  }
}
