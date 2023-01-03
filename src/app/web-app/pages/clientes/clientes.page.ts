import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteService } from 'src/app/api/cliente.service';
import { Cliente } from 'src/app/entidades';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clientes:Observable<Cliente[]> | undefined ;
  constructor(private clienteService:ClienteService
    ) { }

  ngOnInit() {
    this.clientes=this.clienteService.listarclientes();
  }
  eliminarCliente(id:any){
    console.log("entrando")
    Swal.fire({
      title: '¿Esta seguro?',
      heightAuto: false,
      text: `Estas a punto de eliminar el cliente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminarCliente(id)
          .subscribe({
            next: res => {
              console.log(res);
              location.href = '/web/clientes'
              Swal.fire(
                '¡Eliminado!',
                `Cliente eliminado`,
                'success'
              );
            },
            error: e => {
              console.log(e);
              location.href = '/web/clientes'
              Swal.fire(
                '¡Eliminado!',
                `Cliente eliminado`,
                'success'
              );
            }
          });
      }
    });
  }

  getCliente(cliente:Cliente){
    console.log("Entrando")
    Swal.fire({
      title: cliente.nombre,
      html: 'Id: '+cliente.id+'<br>'+
      'Direccion: '+cliente.direccion+'<br>'+
      'Telefono: '+cliente.telefono+'<br>'+
      'Correo: '+cliente.correoElectronico+'<br>'+
      'Tipo: '+cliente.tipoIdentificacion+'<br>'+
      'Identificacion:'+cliente.identificacionNumero,
      imageUrl: 'https://e7.pngegg.com/pngimages/177/551/png-clipart-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper.png',
      imageWidth: 100,
      imageHeight: 100,
      heightAuto: false,
      imageAlt: 'Custom image',
    });
  }
}
