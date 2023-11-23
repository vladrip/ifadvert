import { delay, first, map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthHttpService } from '@apiServices/auth-http.service';
import { LoginResponse } from '@models/login-response';
import { AuthUser } from '@models/auth-user';
import { Credentials } from '@models/credentials';
import { AccessToken } from '@models/access-token';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_EXPIRATION_KEY, USER_KEY } from '@constants/storage-keys';
import { jwtDecode, JwtPayload } from 'jwt-decode';


@Injectable({providedIn: 'root'})
export class AuthService {
  private _user$: ReplaySubject<AuthUser | undefined> = new ReplaySubject<AuthUser | undefined>(1);
  public user$: Observable<AuthUser | undefined> = this._user$.asObservable();
  public isAuthenticated$: Observable<boolean> = this._user$.pipe(map(user => !!user));

  constructor(private authHttpService: AuthHttpService, private router: Router, private toastService: ToastService) {
    let user = this.getUser();
    this._user$.next(user);
    let expirationTimestamp = localStorage.getItem(REFRESH_TOKEN_EXPIRATION_KEY);
    if (user && expirationTimestamp) {
      this.runTokenExpirationTimeout(parseInt(expirationTimestamp));
    }
  }

  login(credentials: Credentials) {
    return this.authHttpService.login(credentials)
      .pipe(tap(loginResponse => {
        this.persistAuthData(loginResponse);
        this._user$.next(this.getUser());
      }));
  }

  refreshToken() {
    return this.authHttpService.refreshToken()
      .pipe(tap(tokenResponse => this.persistRefreshData(tokenResponse) ));
  }

  private persistAuthData(loginResponse: LoginResponse) {
    localStorage.setItem(ACCESS_TOKEN_KEY, loginResponse.accessToken);
    let expirationTimestamp = this.getTokenExpiration(loginResponse.refreshToken)!;
    localStorage.setItem(REFRESH_TOKEN_EXPIRATION_KEY, expirationTimestamp.toString());
    localStorage.setItem(USER_KEY, JSON.stringify(loginResponse.user));
    this.runTokenExpirationTimeout(expirationTimestamp);
  }

  private persistRefreshData(tokenResponse: AccessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, tokenResponse.accessToken);
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_EXPIRATION_KEY);
    localStorage.removeItem(USER_KEY);
    this._user$.next(undefined);
  }

  isAuthenticated() {
    return !!this.getUser();
  }

  getUser() {
    let storedUser = localStorage.getItem(USER_KEY);
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (e) {
      }
    }
  }

  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  getTokenExpiration(token: string) {
    return jwtDecode<JwtPayload>(token).exp;
  }

  isAccessTokenExpired() {
    let token = this.getAccessToken();
    if (!token) return true;
    let expirationDate = this.getTokenExpiration(token);
    return !expirationDate || Date.now() >= expirationDate * 1000;
  }

  private runTokenExpirationTimeout(expiration: number) {
    of(true)
      .pipe(
        delay(expiration * 1000 - Date.now()),
        first()
      )
      .subscribe(() => {
        this.toastService.warning("Session expired", "Your session is expired");
        this.logout();
        this.router.navigate(["login"]);
      });
  }
}
