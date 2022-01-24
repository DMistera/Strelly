import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUserData(userId: number){
    return this.http.get<any>(`/api/Users/`+userId).pipe(map(data => {
      console.log({getUserData: data.status})
      let user = new User(data);
      return user;
    }));
  }

  public getUsers(){
    return this.http.get<any>('/api/Users').pipe(map(result => {
      let users = result.map((d: any) => {
        return new User(d);
      })
      return users;
    }));
  }
}
