import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { SingInGuard } from './guard/sinIn.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./auth/sign-in/sign-in.module').then((m) => m.SignInModule),
    canActivate: [SingInGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./page/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
