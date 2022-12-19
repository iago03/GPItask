import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showSidebar = true;

  constructor(private httpAuthService: AuthService, private router: Router) {
    this.checkUser();
  }

  checkUser() {
    this.httpAuthService.isUserLoggedIn$.subscribe((res: boolean) => {
      this.showSidebar = res;
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });
  }
}
