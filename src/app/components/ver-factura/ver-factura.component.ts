import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FacturaDetalle } from 'src/app/entidades';

@Component({
  selector: 'app-ver-factura',
  templateUrl: './ver-factura.component.html',
  styleUrls: ['./ver-factura.component.scss'],
})
export class VerFacturaComponent implements OnInit {
  
  factura?:FacturaDetalle;
  constructor(private modalContrller: ModalController,
    private navParams:NavParams) {
    this.factura=navParams.get('Factura'); 
  }

  closeModal() {
    this.modalContrller.dismiss();
  }
  descargarFactura(){}

  ngOnInit() {}

}
