import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductoService } from 'src/app/api/producto.service';
import { UserService } from 'src/app/api/user.service';
import { Producto } from 'src/app/entidades';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.page.html',
  styleUrls: ['./register-product.page.scss'],
})
export class RegisterProductPage implements OnInit {
  registerForm:FormGroup=this.fb.group({
    descripcion: ['',[Validators.required]],
    precioUnitario: ['',[Validators.required]],
    usuarioId:[''],
  })
  user:any;
  constructor(private fb: FormBuilder,
              private productoService:ProductoService,
              private userService:UserService,
              private toastController:ToastController,
              private router:Router) { this.user=this.userService.obtenerSesion().body;}

  ngOnInit() {
  }
  guardarProducto(){  
    if(!this.registerForm.valid){
      return false
    }else{
      const producto:Producto={
        descripcion: this.registerForm.get('descripcion')?.value,
        usuarioId:this.user.id,
        precioUnitario:this.registerForm.get('precioUnitario')?.value,
      }
    this.productoService.createProducto(producto)
    .subscribe(
      (res:any)=>{
        console.log("Producto",res)
        this.mostrarMensaje("El Producto fue registrado")
        this.registerForm.reset()
        this.router.navigate(['/web/home'])
        
      },
      (error)=>{
        console.log("Los datos estan incorrectos")
        this.mostrarMensaje(error.error)
        
      });
    
    return true
    }
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
