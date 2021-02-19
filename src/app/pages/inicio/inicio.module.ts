import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
//import {PipesModule} from '../pipes/pipes.module'
import { IonicModule } from '@ionic/angular';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
