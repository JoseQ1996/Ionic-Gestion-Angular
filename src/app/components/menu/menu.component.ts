import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/api/user.service';
import { Componente } from 'src/app/entidades';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  
  componentes:Observable<Componente[]> | undefined;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.componentes=this.userService.getMenuOpts();
  }

}
