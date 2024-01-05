import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes de COMPONENTS
import { DestinatariosComponent } from './destinatarios/destinatarios.component';



// Componente para paginación
import { NgxPaginationModule } from 'ngx-pagination';
import { SegundoDestinatarioComponent } from './segundo-destinatario/segundo-destinatario.component';
import { TercerDestinatarioComponent } from './tercer-destinatario/tercer-destinatario.component';
import { CuartoDestinatarioComponent } from './cuarto-destinatario/cuarto-destinatario.component';



@NgModule({
  declarations: [
    DestinatariosComponent,
    SegundoDestinatarioComponent,
    TercerDestinatarioComponent,
    CuartoDestinatarioComponent,

  ],
  imports: [
    CommonModule,
    NgxPaginationModule
  ],
  exports: [
    DestinatariosComponent
  ]
})
export class ComponentsModule { }
