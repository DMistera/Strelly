import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@app/pages/home/home.component';
import { AuthComponent } from '@app/pages/auth/auth.component';
import { LoggedInGuard } from '@app/services/guards/logged-in.service';
import { LoggedOutGuard } from '@app/services/guards/logged-out.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [LoggedInGuard] },
  { path: 'auth', component: AuthComponent, canActivate: [LoggedOutGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
