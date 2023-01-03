import { Component, OnInit } from '@angular/core';
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
  constructor(private productoService: ProductoService) { }

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

  }


