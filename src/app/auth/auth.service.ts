import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://api.angular-email.com/auth';

  constructor(private client: HttpClient) {}

  userNameAvailable(username: string) {
    return this.client.post<UsernameAvailableResponse>(
      `${this.baseUrl}/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.client.post<SignupResponse>(
      `${this.baseUrl}/signup`,
      credentials
    );
  }
}
