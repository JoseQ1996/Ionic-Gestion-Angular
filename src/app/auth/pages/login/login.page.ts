import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../../api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLoginForm:FormGroup=this.fb.group({
    username:['',[Validators.required]],
    password:['',[Validators.required]],
  })

  constructor(private fb: FormBuilder,
    private userService:UserService,
    private toastController:ToastController,
    private router:Router) { }

  ngOnInit() {
    
  }
  login(){
    if(!this.userLoginForm.valid){
      return false
    }else{
    this.userService.login(this.userLoginForm.value).
    subscribe(
      (res:any)=>{
        console.log("LOGIN",res)
        this.mostrarMensaje("El usuario se a logueado correctamente")
        this.userLoginForm.reset()
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
