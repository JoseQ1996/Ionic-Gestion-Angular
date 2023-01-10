import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/api/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userRegisterForm:FormGroup=this.fb.group({
    username:['',[Validators.required]],
    password:['',[Validators.required]],
    confirmPassword:['',[Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private userService:UserService,
    private toastController:ToastController,
    private router:Router) { }

  ngOnInit() {
    
  }
  register(){
    if(!this.userRegisterForm.valid){
      return false
    }else{
    this.userService.createUser(this.userRegisterForm.value).
    subscribe(
      (data)=>{
        console.log("Hola",data)
        this.mostrarMensaje("El usuario ha sido creado Correctamente")
        this.userRegisterForm.reset()
        this.router.navigate(['/auth/login'])
        
      },
      (error)=>{
        console.log("Ocurrio un error")
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
