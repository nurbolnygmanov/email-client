import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/math-password';
import { UniqueUserName } from '../validators/unique-user-name';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private matchPassword: MatchPassword,
    private uniqueUserName: UniqueUserName,
    private authService: AuthService
  ) {}

  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.uniqueUserName.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    {
      validators: [this.matchPassword.validate],
    }
  );

  formErrors = new FormErrors(this.authForm);

  onSubmit() {
    const { username, password, passwordConfirmation } = this.authForm.value;

    if (!username || !password || !passwordConfirmation) return;

    this.authService
      .signup({ username, password, passwordConfirmation })
      .subscribe({
        // use arrow function to get access to SignupComponent class "this"
        next: (response) => {
          console.log(this);
        },
        error: (error) => {
          if (!error.status) {
            // imperatively set form errors
            this.authForm.setErrors({
              noConnection: true,
            });
          } else {
            this.authForm.setErrors({
              unknownError: true,
            });
          }
        },
      });
  }
}

class FormErrors {
  constructor(private form: FormGroup) {}

  get isError() {
    const {
      errors,
      controls: { password, passwordConfirmation },
    } = this.form;

    return errors && password.touched && passwordConfirmation.touched;
  }

  get passwordsDontMatch(): boolean {
    return this.form.errors?.['passwordsDontMatch'];
  }

  get noConnectionError(): boolean {
    return this.form.errors?.['noConnection'];
  }

  get unknownError(): boolean {
    return this.form.errors?.['unknownError'];
  }
}
