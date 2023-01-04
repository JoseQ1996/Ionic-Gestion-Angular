import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/api/user.service';
import { Componente } from '../../../entidades';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: any;
  constructor(private userService: UserService,
    private router: Router) {
    
  }
  option = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    spaceBetween: 5,
    autoplay: true,
  }
  ngOnInit() {
    // email: this.usuario['username']
    this.usuario = this.userService.obtenerSesion().body;
    console.log("Logueado", this.usuario)


  }
  cerrarSesion() {
    this.userService.cerrarSesion()
    this.router.navigate(['/auth/login'])
    
  }


}
