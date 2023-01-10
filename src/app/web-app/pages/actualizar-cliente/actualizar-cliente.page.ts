import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClienteService } from 'src/app/api/cliente.service';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.page.html',
  styleUrls: ['./actualizar-cliente.page.scss'],
})
export class ActualizarClientePage implements OnInit {
  customAlertOptions = {
    header: 'TIPO DE IDENTIFICACION',
    subHeader: 'Selecciona Tipo de Identificacion',
    message: 'Seleccione uno',
    translucent: true,
  };
  cedula: string = '';
  registerForm:FormGroup=this.fb.group({
    id: [''],
    tipoIdentificacion: ['',[Validators.required]],
    identificacionNumero: ['',[Validators.required]],
    nombre: ['',[Validators.required]],
    direccion: [''],
    telefono: [''],
    correoElectronico: ['',[Validators.required]],
    
  })
  constructor(private fb: FormBuilder,
    private clienteService:ClienteService,
    private toastController:ToastController,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.cedula = this.route.snapshot.paramMap.get('cedula') ?? '';
    console.log(this.cedula);
    if (this.cedula) {
      this.clienteService.getClienteByCedula(this.cedula)
        .subscribe(data => {
          this.registerForm?.setValue({
            id:data.id!,
            tipoIdentificacion: data.tipoIdentificacion,
            identificacionNumero: data.identificacionNumero,
            nombre: data.nombre,
            direccion: data.direccion,
            telefono: data.telefono,
            correoElectronico: data.correoElectronico,
          });
        });
    }
  }
  actualizarCliente(){
    if(!this.registerForm.valid){
      return false
    }else{
    this.clienteService.actualizarCliente(this.registerForm.value).
    subscribe(
      (res:any)=>{
        console.log("Cliente",res)
        this.mostrarMensaje("El Cliente fue actualizado")
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