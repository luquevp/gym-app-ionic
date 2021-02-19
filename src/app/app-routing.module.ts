import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  { path: 'main', 
  loadChildren: './pages/inicio/inicio.module#InicioPageModule',
//canActivate:[UsuarioGuard]
  canLoad: [UsuarioGuard]},
 {
   path: '',
   pathMatch: 'full',
   redirectTo: 'login'
 },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
