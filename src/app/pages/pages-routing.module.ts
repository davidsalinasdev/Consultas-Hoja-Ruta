import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes de PAGES
import { PagesComponent } from './pages.component';

// Rutas
import { HomeRoutingModule } from './home/home-routing.module';


const routes: Routes = [
  // Rutas PROTEGIDAS como hijas de app-routing.module.ts
  {
    // Cuando el path sea vacio va redireciones aun sub moduloComonenete
    path: 'home', // ruta padre
    component: PagesComponent,
    loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    HomeRoutingModule
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
