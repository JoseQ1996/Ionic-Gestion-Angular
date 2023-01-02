import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WebAppPageRoutingModule } from './web-app-routing.module';

import { WebAppPage } from './web-app.page';
import { MenuComponent } from '../components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    WebAppPageRoutingModule
  ],
  declarations: [
    WebAppPage,
    MenuComponent
  ]
})
export class WebAppPageModule {}
