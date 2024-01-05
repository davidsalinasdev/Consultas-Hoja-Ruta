import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componenets de HOME
import { HomeComponent } from './home.component';

const routes: Routes = [
  // Rutas PROTEGIDAS como hijas de app-routing.module.ts
  {
    // Cuando el path sea vacio va redireciones aun sub moduloComonenete
    path: 'home', // ruta padre
    component: HomeComponent,
    loadChildren: () => import('./childh-routes.module').then(m => m.ChildhRoutesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
