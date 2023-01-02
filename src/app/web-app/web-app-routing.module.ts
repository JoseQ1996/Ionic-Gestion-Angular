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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebAppPageRoutingModule { }
