import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ProductoService } from 'src/app/api/producto.service';
import { Detalle } from 'src/app/entidades';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  detalles: Detalle[] = []
  constructor(private productoService: ProductoService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.detalles = this.productoService.listarCarrito();

  }
  eliminar(id: number) {


    console.log("entrando")
    Swal.fire({
      title: '¿Esta seguro?',
      heightAuto: false,
      text: `Estas a punto de eliminar el Producto del Carrito`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const found = this.detalles.findIndex((d: any) => d.servicioId === id)
        this.detalles.splice(found, 1)
        console.log(found, this.detalles)
        localStorage.removeItem('detalles')
        localStorage.setItem('detalles', JSON.stringify(this.detalles))
        location.href = '/web/carrito'
        Swal.fire(
          '¡Eliminado!',
          `Producto eliminado`,
          'success'
        )
      }

    });
  }
  async modificarCarrito(id: number) {
    const found = this.detalles.findIndex((d: any) => d.servicioId === id)
        this.detalles.splice(found, 1)
        console.log(found, this.detalles)
    const alert = await this.alertController.create({
      
      header: 'Agregar a Carrito',
      subHeader: 'Modificar Producto',

      inputs: [

        {
          name: 'precio',
          type: 'number',
          placeholder: 'precio',
          value: 'precio',

        },
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'cantidad',
          min: 1,
          max: 100,
        },
      ],
      buttons: [
        {
          text: 'Agregar',

          // handler: data => {
          //   const total = data.precio * data.cantidad
          //   const id = producto.id
          //   console.log(data.precio, data.cantidad, total, id);
          //   const detalle: Detalle = {
          //     cantidad: data.cantidad,
          //     precioUnitario: data.precio,
          //     total: total,
          //     servicioId: id,

          //   }
          //   this.productoService.addCarrito(detalle);
          // }
        },
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: data => {
            console.log('Cancelado');
          }
        },
      ],
    });

    await alert.present();
  }

}


