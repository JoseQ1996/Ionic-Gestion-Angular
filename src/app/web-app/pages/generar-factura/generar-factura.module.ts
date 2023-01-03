import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarFacturaPageRoutingModule } from './generar-factura-routing.module';

import { GenerarFacturaPage } from './generar-factura.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    GenerarFacturaPageRoutingModule
  ],
  declarations: [GenerarFacturaPage]
})
export class GenerarFacturaPageModule {}
