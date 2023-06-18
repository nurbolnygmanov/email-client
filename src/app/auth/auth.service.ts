import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

type UsernameAvailableResponse = {
  available: boolean;
};

export type SignupCredentials = {
  username: string;
  password: string;
  passwordConfirmation: string;
};

type SignupResponse = {
  username: string;
};

type SignedInResponse = { authenticated: boolean; username: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://api.angular-email.com/auth';
  signedIn$ = new BehaviorSubject<boolean | null>(null);

  constructor(private httpClient: HttpClient) {}

  userNameAvailable(username: string) {
    return this.httpClient.post<UsernameAvailableResponse>(
      `${this.baseUrl}/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.httpClient
      .post<SignupResponse>(`${this.baseUrl}/signup`, credentials)
      .pipe(
        tap(() => {
          this.signedIn$.next(true);
        })
      );
  }

  checkAuth() {
    return this.httpClient
      .get<SignedInResponse>(`${this.baseUrl}/signedin`)
      .pipe(
        tap(({ authenticated }) => {
          this.signedIn$.next(authenticated);
        })
      );
  }

  signout() {
    return this.httpClient
      .post(`${this.baseUrl}/signout`, {})
      .pipe(tap(() => this.signedIn$.next(false)));
  }

  signin(credentials: Omit<SignupCredentials, 'passwordConfirmation'>) {
    return this.httpClient
      .post(`${this.baseUrl}/signin`, credentials)
      .pipe(tap(() => this.signedIn$.next(true)));
  }
}
