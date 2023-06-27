import { Component } from '@angular/core';
import { EmailDetails, EmailService } from '../email.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent {
  showModal = false;
  email: EmailDetails;

  constructor(
    private authServce: AuthService,
    private emailService: EmailService
  ) {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${this.authServce.username}@angular-email.com`,
    };
  }

  onEmailSubmit(email: EmailDetails) {
    this.emailService.sendEmail(email).subscribe((response) => {
      this.showModal = false;
    });
  }
}
