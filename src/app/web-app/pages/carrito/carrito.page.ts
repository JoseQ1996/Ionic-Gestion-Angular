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
    this.detalles[found].cantidad;
    
    const alert = await this.alertController.create({
      
      header: 'Agregar a Carrito',
      subHeader: 'Modificar Producto',

      inputs: [

        {
          name: 'precio',
          type: 'number',
          placeholder: this.detalles[found].precioUnitario.toString(),
          value: this.detalles[found].precioUnitario,

        },
        {
          name: 'cantidad',
          type: 'number',
          placeholder: this.detalles[found].cantidad.toString(),
          min: 1,
          max: 100,
        },
      ],
      buttons: [
        {
          text: 'Modificar',
          handler: data => {
            const cant=data.cantidad
            const precio=data.precio
            const total=data.cantidad*data.precio
            this.detalles[found].precioUnitario=precio
            this.detalles[found].cantidad=cant
            this.detalles[found].total=total
            console.log(this.detalles[found]);
            localStorage.removeItem('detalles')
            localStorage.setItem('detalles', JSON.stringify(this.detalles))
          }
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


