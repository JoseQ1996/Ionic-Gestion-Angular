import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturasPageRoutingModule } from './facturas-routing.module';

import { FacturasPage } from './facturas.page';
import { VerFacturaComponent } from 'src/app/components/ver-factura/ver-factura.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturasPageRoutingModule
  ],
  declarations: [FacturasPage,VerFacturaComponent]
})
export class FacturasPageModule {}
