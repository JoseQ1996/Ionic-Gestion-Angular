import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../entidades';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  endpoint = environment.backEndServer + 'api/cliente/'
  httpsOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }
  
  createCliente(cliente: Cliente): Observable<any> {
    let finalUrl = this.endpoint + 'create'
    return this.httpClient.post<Cliente>(finalUrl, cliente, this.httpsOptions)
  }
  listarclientes():Observable<Cliente[]>{
    let finalUrl = this.endpoint + 'findAll'
    return this.httpClient.get<Cliente[]>(finalUrl);
    
  } 
  eliminarCliente(id: number) {
    let finalUrl = this.endpoint + 'delete'
    return this.httpClient.get(`${finalUrl}/${id}`);
  }
  getClienteByCedula(cedula:string):Observable<Cliente>{
    let finalUrl = this.endpoint + 'findByCedula'
    return this.httpClient.get<Cliente>(`${finalUrl}/${cedula}`);
  }
}
