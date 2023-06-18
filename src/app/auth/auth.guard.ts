import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment } from '@angular/router';
import { Observable, skipWhile, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  // canLoad for lazy loading modules
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | null> {
    return this.authService.signedIn$.pipe(
      skipWhile((value) => value === null),
      take(1),
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
