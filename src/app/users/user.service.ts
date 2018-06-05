import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../model/user.model';
import { httpOptions } from '../common.functions';
import { AuthService } from '../auth/auth.service';

(window as any).global = window;

@Injectable() 
export class UserService {

    URL = 'http://localhost:8080/main/webservices/users';

    constructor(private http: HttpClient) { }

    userLogIn(user,auth:AuthService): Observable<User> {
        return this.http.post<User>(this.URL, user, httpOptions(auth));
    }

}