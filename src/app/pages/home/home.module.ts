
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Rutas de Home
import { HomeRoutingModule } from './home-routing.module';

// Componentes de home
import { GuiatramitesComponent } from './guiatramites/guiatramites.component';
import { TramitesComponent } from './tramites/tramites.component';
import { PrincipalhomeComponent } from './principalhome/principalhome.component';

@NgModule({
  declarations: [
    GuiatramitesComponent,
    TramitesComponent,
    PrincipalhomeComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  exports: [
    GuiatramitesComponent,
    TramitesComponent,
    PrincipalhomeComponent,

  ]
})
export class HomeModule { }
