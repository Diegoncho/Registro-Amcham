import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './componentes/main.component';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './pantallas/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RifaComponent } from '../rifa/rifa.component';
import { FinalAmchamComponent } from '../rifa/final-amcham/final-amcham.component';

const routes: Routes = [
  { path: '', redirectTo: 'AmCham', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'AmCham', loadChildren: '../catalogos/catalogos.module#CatalogosModule'},
      { path: 'AmChamAdmin', loadChildren: '../admin/admin.module#AdminModule', canActivate: [AuthGuard] },
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'rifa', component: RifaComponent},
  { path: 'final', component: FinalAmchamComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
