import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Detalle, Producto } from '../entidades';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  endpoint = environment.backEndServer + 'api/servicio/'
  httpsOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  detalles:Detalle[]=[]
  
  constructor(private httpClient: HttpClient) { }

  createProducto(producto:Producto) {
    let finalUrl = this.endpoint + 'create'
    return this.httpClient.post<Producto>(finalUrl, producto, this.httpsOptions)
  }
  listarProductos(id:number):Observable<Producto[]>{
    let finalUrl = this.endpoint + 'findAll'
    return this.httpClient.get<Producto[]>(`${finalUrl}/${id}`);
    
  } 
  eliminarProducto(id: number) {
    let finalUrl = this.endpoint + 'delete'
    return this.httpClient.get(`${finalUrl}/${id}`);
  }
  
  addCarrito(detalle:Detalle){
    this.detalles.push(detalle)
    localStorage.setItem("detalles",JSON.stringify(this.detalles))
  }
  listarCarrito(){
    var storeList=localStorage.getItem('detalles')
    if(storeList==null){
      console.log("Carrito Vacio")
    }
    else{
      this.detalles=JSON.parse(storeList)
    }
    return this.detalles
  }
  
}
