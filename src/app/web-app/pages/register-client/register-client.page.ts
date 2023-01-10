import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ClienteService } from 'src/app/api/cliente.service';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.page.html',
  styleUrls: ['./register-client.page.scss'],
})
export class RegisterClientPage implements OnInit {
  customAlertOptions = {
    header: 'TIPO DE IDENTIFICACION',
    subHeader: 'Selecciona Tipo de Identificacion',
    message: 'Seleccione uno',
    translucent: true,
  };
  registerForm:FormGroup=this.fb.group({
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
              private router:Router) { }

  ngOnInit() {

  }
  guardarCliente(){
    if(!this.registerForm.valid){
      return false
    }else{
    this.clienteService.createCliente(this.registerForm.value).
    subscribe(
      (res:any)=>{
        console.log("Cliente",res)
        this.mostrarMensaje("El Cliente fue registrado")
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
