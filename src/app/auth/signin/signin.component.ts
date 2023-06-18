import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signInForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.signInForm.invalid) return;

    const { username, password } = this.signInForm.value;
    if (!username || !password) return;

    this.authService.signin({ username, password }).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: ({ error }: HttpErrorResponse) => {
        if (error.username || error.password) {
          this.signInForm.setErrors({ credentials: true });
        }
      },
    });
  }
}
