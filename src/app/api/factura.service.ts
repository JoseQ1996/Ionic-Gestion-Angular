import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Factura, FacturaDetalle } from '../entidades';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  endpoint = environment.backEndServer + 'api/factura/'
  httpsOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }
  createFacura(factura:Factura) {
    let finalUrl = this.endpoint + 'create'
    return this.httpClient.post<Factura>(finalUrl, factura, this.httpsOptions)
  }
  listarFacturas(id:number):Observable<FacturaDetalle[]>{
    let finalUrl = this.endpoint + 'findAll'
    return this.httpClient.get<FacturaDetalle[]>(`${finalUrl}/${id}`);   
  } 
  listarFacturasEmitidas(id:number):Observable<FacturaDetalle[]>{
    let finalUrl = this.endpoint + 'findAll/issued'
    return this.httpClient.get<FacturaDetalle[]>(`${finalUrl}/${id}`);   
  } 
  listarFacturasAnuladas(id:number):Observable<FacturaDetalle[]>{
    let finalUrl = this.endpoint + 'findAll/cancel'
    return this.httpClient.get<FacturaDetalle[]>(`${finalUrl}/${id}`);   
  } 
  anularFactura(id:number){
    let finalUrl = this.endpoint + 'cancel'
    return this.httpClient.get<Factura>(`${finalUrl}/${id}`)
  }
}
