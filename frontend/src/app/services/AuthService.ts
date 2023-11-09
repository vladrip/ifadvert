import { Injectable } from '@angular/core';
import { Credentials } from '../models/Credentials';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  isAuthenticated() {
    return true;
  }

  login(credentials: Credentials) {
    return of("Signed in successfully")
  }

  logout() {
  }
}
