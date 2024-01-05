
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing del componente PAGES
import { PagesRoutingModule } from './pages-routing.module';

// Componentes de PAGES
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { CorrespondenciaComponent } from './correspondencia/correspondencia.component';
import { AcercaComponent } from './acerca/acerca.component';

// Modulo personalizado SHARED
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { HomeModule } from './home/home.module';

// Modulos de componentes Hijos
import { ComponentsModule } from '../components/components.module';
import { ContactanosComponent } from './contactanos/contactanos.component';


// Carrusel OWL
import { CarouselModule } from 'ngx-owl-carousel-o';

// Componente para paginación
import { NgxPaginationModule } from 'ngx-pagination';
import { ConsultarComponent } from './consultar/consultar.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    CorrespondenciaComponent,
    AcercaComponent,
    ContactanosComponent,
    ConsultarComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    ComponentsModule,
    CarouselModule,
    NgxPaginationModule
  ],
  exports: [
    PagesComponent,
    HomeComponent,
    CorrespondenciaComponent,
    ConsultarComponent
  ]
})
export class PagesModule { }
