import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HomeModule } from './layout/home/home.module'; 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // MaterialModule,
    // FormsModule, 
    CommonModule,
    BrowserModule,
    // HttpClientModule,
    AppRoutingModule,
    // CoreModule,
    SharedModule,
    LayoutModule,
    HomeModule
    
],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
