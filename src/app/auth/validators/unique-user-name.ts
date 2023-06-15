import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUserName implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (
    control: AbstractControl<any, any>
  ): Observable<ValidationErrors | null> => {
    const { value } = control;

    return this.authService.userNameAvailable(value).pipe(
      map(() => null),
      catchError((err) => {
        if (err.error.username) {
          return of({
            nonUniqueUserName: true,
          });
        }

        return of({ noConnection: true });
      })
    );
  };
}
