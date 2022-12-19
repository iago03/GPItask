import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthInterface } from '../shared/interface/auth-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated();
  }

  isAuthenticated() {
    if (localStorage.getItem('user')) {
      this.isUserLoggedIn$.next(true);
    } else {
      this.isUserLoggedIn$.next(false);
    }
  }

  signIn(item: object) {
    return this.http.post<AuthInterface>(`${environment.api_url}Security/CreateToken`, item);
  }

  logOut() {
    this.isUserLoggedIn$.next(false);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  seToken(response: AuthInterface) {
    if (response) {
      localStorage.setItem('user', response.data);
    }
  }
}
