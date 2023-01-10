import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductoService } from 'src/app/api/producto.service';
import { UserService } from 'src/app/api/user.service';
import { Detalle, Producto } from 'src/app/entidades';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productos:Observable<Producto[]> | undefined ;
  user:any;
  detalles: Detalle[] = []
  constructor(private productoService:ProductoService,
              private userService:UserService,
              private alertController: AlertController,
              private router:Router,
              private toastController:ToastController) {this.user=this.userService.obtenerSesion().body }

  ngOnInit() {
    const id=this.user.id
    this.productos=this.productoService.listarProductos(id);
    this.detalles = this.productoService.listarCarrito();
  }
  eliminarProducto(id:any){
    console.log("entrando")
    Swal.fire({
      title: '¿Esta seguro?',
      heightAuto: false,
      text: `Estas a punto de eliminar el Producto`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3371c1',
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
  async agregarCarrito(producto:Producto){
    const alert = await this.alertController.create({
      header: 'Agregar a Carrito',
      subHeader: producto.descripcion,

      inputs: [
        
        {
          name: 'precio',
          type: 'number',
          placeholder: producto.precioUnitario.toString(),
          value:producto.precioUnitario,
          
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
        
        handler: data => {
          const total=data.precio*data.cantidad
          const id=producto.id
          const found = this.detalles.findIndex((d: any) => d.servicioId === id)
          if(found != -1){
            console.log(this.detalles[found])
            Swal.fire({
              title: 'El producto ya esta Agregado',
              text:'Si desea modificar la cantidad vaya al carrito',
              heightAuto: false,
              confirmButtonColor:'#3371c1',
              cancelButtonColor: '#d33',
              showCancelButton: true,
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate([ '/web/carrito'])
              }
            })
          }else{
          console.log(data.precio,data.cantidad,total,id);
          const detalle:Detalle={
            cantidad:data.cantidad,
            precioUnitario:data.precio,
            total:total,
            servicioId:id,
              
          }
          this.productoService.addCarrito(detalle);
          this.mostrarMensaje("El Producto fue agregado")
        }
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
  async mostrarMensaje(mensaje:any){
    const toast=await this.toastController.create({
      position:'bottom',
      message: mensaje,
      duration:1000
    })
    toast.present()
  }
  
}
    

