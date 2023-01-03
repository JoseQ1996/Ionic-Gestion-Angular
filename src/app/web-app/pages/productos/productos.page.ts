import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoService } from 'src/app/api/producto.service';
import { UserService } from 'src/app/api/user.service';
import { Producto } from 'src/app/entidades';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productos:Observable<Producto[]> | undefined ;
  user:any;
  constructor(private productoService:ProductoService,
              private userService:UserService) {this.user=this.userService.obtenerSesion().body }

  ngOnInit() {
    const id=this.user.id
    this.productos=this.productoService.listarProductos(id);
  }
  eliminarProducto(id:any){
    console.log("entrando")
    Swal.fire({
      title: '¿Esta seguro?',
      heightAuto: false,
      text: `Estas a punto de eliminar el Producto`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarProducto(id)
          .subscribe({
            next: res => {
              console.log(res);
              location.href = '/web/productos'
              Swal.fire(
                '¡Eliminado!',
                `Producto eliminado`,
                'success'
              );
            },
            error: e => {
              console.log(e);
              location.href = '/web/productos'
              Swal.fire(
                '¡Eliminado!',
                `Producto eliminado`,
                'success'
              );
            }
          });
      }
    });
  }
}
