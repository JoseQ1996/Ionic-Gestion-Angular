import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Componente } from '../../../entidades';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  constructor() {}
  option = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    spaceBetween: 5,
    autoplay:true,
  }

}
