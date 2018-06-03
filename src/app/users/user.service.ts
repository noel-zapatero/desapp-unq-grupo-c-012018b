import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../model/user.model';

(window as any).global = window;

@Injectable() 
export class UserService {

    URL = 'http://localhost:8080/main/webservices/users';

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };

    constructor(private http: HttpClient) { }

    userLogIn(user: any): Observable<User> {
        return this.http.post<User>(this.URL, user,this.httpOptions);
    }

}