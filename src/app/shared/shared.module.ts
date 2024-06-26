import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

// Componentes de SHARED
import { HeaderComponent } from './header/header.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderInternoComponent } from './header-interno/header-interno.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ParallaxComponent,
    FooterComponent,
    HeaderInternoComponent
  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports: [
    HeaderComponent,
    ParallaxComponent,
    FooterComponent,
    HeaderInternoComponent
  ]
})
export class SharedModule { }
