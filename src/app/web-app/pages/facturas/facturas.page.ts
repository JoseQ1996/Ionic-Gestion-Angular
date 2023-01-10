import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FacturaService } from 'src/app/api/factura.service';
import { UserService } from 'src/app/api/user.service';
import { VerFacturaComponent } from 'src/app/components/ver-factura/ver-factura.component';
import {  FacturaDetalle } from 'src/app/entidades';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.page.html',
  styleUrls: ['./facturas.page.scss'],
})
export class FacturasPage implements OnInit {
  facturas: Observable<FacturaDetalle[]> | undefined;
  user: any;
  constructor(private facturaService: FacturaService,
    private userService: UserService,
    private modalCtrl: ModalController ) { this.user = this.userService.obtenerSesion().body }

  ngOnInit() {
    const id = this.user.id
    this.facturas = this.facturaService.listarFacturas(id)
  }
  anularFactura(id: any) {
    console.log("entrando")
    Swal.fire({
      title: '¿Esta seguro?',
      heightAuto: false,
      text: `Desea Anular la Factura`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3371c1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturaService.anularFactura(id)
          .subscribe({
            next: res => {
              console.log(res);
              location.href = '/web/facturas'
              Swal.fire(
                '¡Anulada!',
                `Factura Anulada`,
                'success'
              );
            },
            error: e => {
              console.log(e);
              location.href = '/web/facturas'
              Swal.fire(
                '¡Anulada!',
                `Factura Anulada`,
                'success'
              );
            }
          });
      }
    });
  }
  todas() {
    const id = this.user.id
    this.facturas = this.facturaService.listarFacturas(id)
  }
  emitidas() {
    const id = this.user.id
    this.facturas = this.facturaService.listarFacturasEmitidas(id)
  }
  anuladas() {
    const id = this.user.id
    this.facturas = this.facturaService.listarFacturasAnuladas(id)
  }
  mostrarDetalles(f: FacturaDetalle) {
    console.log("Entrando")




    Swal.fire({
      title: 'Detalles',
      html: `<table id="table" border=1>
        <thead>
            <tr>
                <th>Servicio</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                
            </tr>
        </thead>
        <tbody>
        ${f.detalles.map(d => `<tr>
        <td>${d.servicio.descripcion}</td>
        <td>${d.precioUnitario}</td>
        <td>${d.cantidad}</td>
        <td>${d.total}</td>
        </tr>`).join('')}
        </tbody>
</table>`,

      heightAuto: false,

    })


  }
  async presentModal(f:FacturaDetalle) {
    const modal = await this.modalCtrl.create({
      component: VerFacturaComponent,
      componentProps: {
        'Factura':f
      }
    });
    return await modal.present();
  }
}
