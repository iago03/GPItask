import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SingInGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.isUserLoggedIn$.pipe(
      map((o: boolean) => (o ? false : true))
    );
  }
}
