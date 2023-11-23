import { API } from '@constants/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '@models/login-response';
import { Credentials } from '@models/credentials';
import { AccessToken } from '@models/access-token';


@Injectable({providedIn: 'root'})
export class AuthHttpService {
  private readonly URL = `${API}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: Credentials) {
    return this.http.post<LoginResponse>(`${this.URL}/login`, credentials);
  }

  refreshToken() {
    return this.http.post<AccessToken>(`${this.URL}/refresh-token`, undefined);
  }
}
