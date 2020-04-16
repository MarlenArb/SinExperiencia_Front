import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './USERS.json';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserService {

  users: User[];
  constructor() { }

    getUsers(): Observable<User[]> {
      return of (USERS);
    }
  

}
