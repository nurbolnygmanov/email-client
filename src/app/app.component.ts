import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  signedin$: BehaviorSubject<boolean | null>;

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedIn$;
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe(() => {});
  }

  // subscribing to subject
  // ngOnInit() {
  //   this.authService.signedIn$.subscribe(
  //     (signedin) => (this.signedin = signedin)
  //   );
  // }
}
