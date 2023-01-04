import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  actualizarCliente(){
    
  }

}
