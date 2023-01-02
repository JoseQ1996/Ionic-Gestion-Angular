import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';

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
  registerForm=this.fb.group({
    tipoIdentificacion: ['',[Validators.required]],
    identificacionNumero: ['',[Validators.required]],
    nombre: ['',[Validators.required]],
    direccion: [''],
    telefono: [''],
    correoElectronico: ['',[Validators.required]],
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }
  guardarCliente(){
    console.log(this.registerForm.value)
  }
  
}
