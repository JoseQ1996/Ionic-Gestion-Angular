import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/api/producto.service';
import { Detalle } from 'src/app/entidades';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  detalles:Detalle[]=[]
  constructor(private productoService:ProductoService) { }

  ngOnInit() {
    this.detalles=this.productoService.listarCarrito();

  }

}
