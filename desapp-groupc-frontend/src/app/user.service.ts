import { Injectable } from '@angular/core';
import {User} from './model/user';
import {HttpClient} from '@angular/common/http';

const URL = 'http://localhost:3000/users';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
/*
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(URL);
  }*/
}
