import { Component, Input } from '@angular/core';
import { EmailDetails } from '../email.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

type EmailForm = {
  to: FormControl<string | null>;
  from: FormControl<string | null>;
  subject: FormControl<string | null>;
  text: FormControl<string | null>;
};

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent {
  emailForm!: FormGroup<EmailForm>;
  @Input() email!: EmailDetails;

  ngOnInit() {
    const { subject, from, to, text } = this.email;

    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    });
  }
}
