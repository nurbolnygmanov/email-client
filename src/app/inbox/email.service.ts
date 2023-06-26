import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type EmailSummary = {
  id: string;
  subject: string;
  from: string;
};

export type EmailDetails = {
  id: string;
  subject: string;
  text: string;
  to: string;
  from: string;
  html: string;
};

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  ROOT_URL = 'https://api.angular-email.com';

  constructor(private http: HttpClient) {}

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.ROOT_URL}/emails`);
  }

  getEmail(id: Pick<EmailSummary, 'id'>) {
    return this.http.get<EmailDetails>(`${this.ROOT_URL}/emails/${id}`);
  }
}
