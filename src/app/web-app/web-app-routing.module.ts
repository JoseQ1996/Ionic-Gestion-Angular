import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebAppPage } from './web-app.page';

const routes: Routes = [
  {
    path: '',
    component: WebAppPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../web-app/pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'register-client',
        loadChildren: () => import('../web-app/pages/register-client/register-client.module').then(m => m.RegisterClientPageModule)
      },
    ]
  },
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'register-product',
    loadChildren: () => import('./pages/register-product/register-product.module').then( m => m.RegisterProductPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pages/carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'generar-factura',
    loadChildren: () => import('./pages/generar-factura/generar-factura.module').then( m => m.GenerarFacturaPageModule)
  },
  {
    path: 'facturas',
    loadChildren: () => import('./pages/facturas/facturas.module').then( m => m.FacturasPageModule)
  },
  {
    path: 'actualizar-cliente',
    loadChildren: () => import('./pages/actualizar-cliente/actualizar-cliente.module').then( m => m.ActualizarClientePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebAppPageRoutingModule { }
