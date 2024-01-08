import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componentes de home
import { HomeComponent } from './home/home.component';
import { CorrespondenciaComponent } from './correspondencia/correspondencia.component';
import { AcercaComponent } from './acerca/acerca.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { InternoComponent } from './interno/interno.component';


const routes: Routes = [
    // Home
    { path: '', component: HomeComponent, data: { titulo: 'Pagina de inicio' } }, // Path inicial
    { path: 'correspondencia', component: CorrespondenciaComponent, data: { titulo: 'Correspondencia' } }, // Path inicial
    { path: 'acercade', component: AcercaComponent, data: { titulo: 'Acerca de..' } }, // Path inicial
    { path: 'contactanos', component: ContactanosComponent, data: { titulo: 'Contactanos' } }, // Path inicial
    { path: 'consultar', component: ConsultarComponent, data: { titulo: 'Consultas de sistemas' } }, // Path inicial

    { path: 'interno', component: InternoComponent, data: { titulo: 'Interno' } }, // Path inicial

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }
