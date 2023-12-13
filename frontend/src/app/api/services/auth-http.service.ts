import { API } from '@constants/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '@models/LoginResponse';
import { Credentials } from '@models/Credentials';
import { AccessToken } from '@models/AccessToken';
import { AuthData } from '@models/AuthData';


@Injectable({providedIn: 'root'})
export class AuthHttpService {
  private readonly URL = `${API}/auth`;

  constructor(private http: HttpClient) {}

  register(authData: AuthData) {
    return this.http.post(`${this.URL}/register`, authData);
  }

  login(credentials: Credentials) {
    return this.http.post<LoginResponse>(`${this.URL}/login`, credentials);
  }

  refreshToken() {
    return this.http.post<AccessToken>(`${this.URL}/refresh-token`, undefined);
  }
}
