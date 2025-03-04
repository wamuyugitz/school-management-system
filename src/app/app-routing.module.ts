import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';


const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' }, // Redirect empty path to auth
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule),
  },
  { path: '**', redirectTo: 'auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
