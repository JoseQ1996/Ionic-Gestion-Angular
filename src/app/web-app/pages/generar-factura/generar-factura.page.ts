import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/api/cliente.service';
import { ProductoService } from 'src/app/api/producto.service';
import { Cliente, Detalle } from 'src/app/entidades';

@Component({
  selector: 'app-generar-factura',
  templateUrl: './generar-factura.page.html',
  styleUrls: ['./generar-factura.page.scss'],
})
export class GenerarFacturaPage implements OnInit {
  registerForm: FormGroup = this.fb.group({
    identificacionNumero: ['', [Validators.required]],

  })

  cliente: Cliente | undefined;
  detalles: Detalle[] = []
  total: number = 0
  subtotal: number = 0
  iva: number = 0
  fecha: number = Date.now()
  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private productoService: ProductoService) { }

  ngOnInit() {
    this.detalles = this.productoService.listarCarrito();
    this.registerForm.valueChanges
      .subscribe(res => {
        const cedula: string = res['identificacionNumero'];
        if (cedula.length > 9) {
          this.clienteService.getClienteByCedula(cedula)
            .subscribe(cliente => {
              this.cliente = cliente;
            })
        } else {
          this.cliente = undefined;
        }
      })
      for(let d of this.detalles){
        console.log(d)
        this.subtotal+=d.total
      }
      this.iva=this.subtotal*0.12
      this.total=this.subtotal+this.iva
  }
  facturar() {

  }

}
