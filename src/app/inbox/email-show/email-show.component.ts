import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailDetails } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent {
  emailDetails: EmailDetails;

  constructor(private route: ActivatedRoute) {
    this.emailDetails = this.route.snapshot.data['email'];
    this.route.data.subscribe(({ email }) => {
      this.emailDetails = email;
    });
  }
}
