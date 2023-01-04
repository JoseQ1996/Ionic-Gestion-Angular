import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProductoService } from 'src/app/api/producto.service';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-actualizar-producto',
  templateUrl: './actualizar-producto.page.html',
  styleUrls: ['./actualizar-producto.page.scss'],
})
export class ActualizarProductoPage implements OnInit {
  productoid: number = 0;
  registerForm:FormGroup=this.fb.group({
    descripcion: ['',[Validators.required]],
    precioUnitario: ['',[Validators.required]],
    id:[''],
  })
  user:any
  constructor(private fb: FormBuilder,
    private productoService:ProductoService,
    private route: ActivatedRoute,
    private userService:UserService,
    private toastController:ToastController,
    private router:Router) { this.user=this.userService.obtenerSesion().body}

  ngOnInit() {
    this.productoid = parseInt(this.route.snapshot.paramMap.get('producto') ?? '0');
    //console.log(this.productoid)
    const usuario = this.user.id
    if (this.productoid ) {
      this.productoService.productofindById(usuario, this.productoid)
        .subscribe(data => {
          //console.log(data);
          this.registerForm?.setValue({
            descripcion: data?.descripcion,
            precioUnitario: data?.precioUnitario,
            id:this.productoid
          });
        });
    }
    
  }
  actualizarProducto(){
    if(!this.registerForm.valid){
      return false
    }else{
    this.productoService.actualizarProducto(this.registerForm.value).
    subscribe(
      (res:any)=>{
        console.log("Producto",res)
        this.mostrarMensaje("El Producto fue actualizado")
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
      position:'top',
      message: mensaje,
      duration:3000
    })
    toast.present()
  }
  
}