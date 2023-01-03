import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Componente, Usuario } from '../entidades';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint = environment.backEndServer + 'api/usuario/'
  httpsOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  createUser(usuario: Usuario): Observable<any> {
    let finalUrl = this.endpoint + 'create'
    return this.httpClient.post<Usuario>(finalUrl, usuario, this.httpsOptions)
  }
  login(usuario: Usuario): Observable<any> {
    console.info(usuario)
    let finalUrl = this.endpoint + 'login'
    return this.httpClient.post<Usuario>(finalUrl, usuario, { observe: 'response' })
  }
  getMenuOpts(){
    return this.httpClient.get<Componente[]>('/assets/data/menu.json')
  }
  public obtenerSesion() {
    const data = localStorage.getItem('usuario');
    if (data) {
      const usuario = JSON.parse(data);
      return usuario;
    }
    return null;
  }
}
