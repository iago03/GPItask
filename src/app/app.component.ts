import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sidebar = true;

  constructor(private httpAuthService: AuthService) {
    this.checkUser();
  }

  checkUser() {
    this.httpAuthService.isUserLoggedIn$.subscribe(
      (res: boolean) => (this.sidebar = res)
    );
  }
}
