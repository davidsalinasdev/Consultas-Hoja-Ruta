import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Routing Principal de APP
import { AppRoutingModule } from './app-routing.module';

// Modulos personalizados
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Para peticiones HTTP
import { HttpClientModule } from '@angular/common/http';

// Componentes principales de APP
import { AppComponent } from './app.component';
import { NopagescomponentComponent } from './nopagescomponent/nopagescomponent.component';

// Notificaciones Toastr
import { ToastrModule } from 'ngx-toastr';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NopagescomponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(), // ToastrModule added

  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
