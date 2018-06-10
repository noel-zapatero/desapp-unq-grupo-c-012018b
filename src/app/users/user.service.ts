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

    options = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            // TODO: agregar authorizartion token 
        })
    }

    constructor(private http: HttpClient) { }

    userLogIn(user,auth:AuthService): Observable<User> {
        return this.http.post<User>(this.URL, user, httpOptions(auth));
    }

    chargeCredits(userEmail:String, credits:number): Observable<User> {
        return this.http.post<User>(
            this.URL + '/chargecredits',
            {
                'userEmail': userEmail,
                'credits': credits
            },
            this.options
        );
    }

    withdrawCredits(userEmail:String, credits:number): Observable<User> {
        return this.http.post<User>(
            this.URL + '/withdrawcredits',
            {
                'userEmail': userEmail,
                'credits': credits
            },
            this.options
        );
    }

}