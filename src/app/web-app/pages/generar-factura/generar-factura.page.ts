import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClienteService } from 'src/app/api/cliente.service';
import { FacturaService } from 'src/app/api/factura.service';
import { ProductoService } from 'src/app/api/producto.service';
import { UserService } from 'src/app/api/user.service';
import { Cliente, Detalle, Factura } from 'src/app/entidades';

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
  fecha: any = Date.now()
  user:any
  constructor(private fb: FormBuilder,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private userService:UserService,
    private facturaService:FacturaService,
    private toastController:ToastController,
              private router:Router) { }

  ngOnInit() {
    this.detalles = this.productoService.listarCarrito();
    this.user=this.userService.obtenerSesion().body;
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
    const factura:Factura={
      fechaDeEmision:this.fecha,
      subtotal:this.subtotal,
      impuesto:this.iva,
      total:this.total,
      clienteId:this.cliente?.id!,
      usuarioId:this.user.id,
      detalles:this.detalles
    }
    console.log(factura)
    this.facturaService.createFacura(factura)
    .subscribe(
      (res:any)=>{
        console.log("Factura",res)
        this.mostrarMensaje("La Factura fue registrada")
        this.registerForm.reset()
        //localStorage.clear
        this.router.navigate(['/web/home'])
        
      },
      (error)=>{
        console.log("Los datos estan incorrectos")
        this.mostrarMensaje(error.error)
        
      });
    
    }
  
  async mostrarMensaje(mensaje:any){
    const toast=await this.toastController.create({
      position:'top',
      message: mensaje,
      duration:3000
    })
    toast.present()
  }
  
}

