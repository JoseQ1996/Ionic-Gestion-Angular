import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterProductPageRoutingModule } from './register-product-routing.module';

import { RegisterProductPage } from './register-product.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterProductPageRoutingModule
  ],
  declarations: [RegisterProductPage]
})
export class RegisterProductPageModule {}
