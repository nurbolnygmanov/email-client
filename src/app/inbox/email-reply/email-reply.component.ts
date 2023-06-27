import { Component, Input } from '@angular/core';
import { EmailDetails, EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent {
  showModal = false;
  @Input() email!: EmailDetails;

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `Re: ${this.email.subject}`,
      text: `\n\n\n --- ${this.email.from} wrote:\n ${this.email.text}`,
    };
  }

  onSubmit(email: EmailDetails) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }
}
