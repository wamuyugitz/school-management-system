import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' }, // Redirect empty path to auth
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  //{ path: '**', redirectTo: 'auth' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
