import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componentes de HOME
import { PrincipalhomeComponent } from './principalhome/principalhome.component';
import { TramitesComponent } from './tramites/tramites.component';
import { GuiatramitesComponent } from './guiatramites/guiatramites.component';



const routes: Routes = [
    // Home
    { path: '', component: PrincipalhomeComponent, data: { titulo: 'Pagina principal de home' } }, // Path inicial
    { path: 'tramites', component: TramitesComponent, data: { titulo: 'Componente Tramites' } }, // Path inicial
    { path: 'guiatramites', component: GuiatramitesComponent, data: { titulo: 'Componente Tramites' } }, // Path inicial

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChildhRoutesModule { }