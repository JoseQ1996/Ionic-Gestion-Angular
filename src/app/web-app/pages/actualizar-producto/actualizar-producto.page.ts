import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/api/producto.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.page.html',
  styleUrls: ['./actualizar-producto.page.scss'],
})
export class ActualizarProductoPage implements OnInit {
  registerForm:FormGroup=this.fb.group({
    descripcion: ['',[Validators.required]],
    precioUnitario: ['',[Validators.required]],
    usuarioId:[''],
  })
  constructor(private fb: FormBuilder,
    private productoService:ProductoService,) { }

  ngOnInit() {
  }
  actualizarProducto(){

  }
}
