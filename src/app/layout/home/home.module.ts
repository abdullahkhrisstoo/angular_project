import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { PricingComponent } from './components/pricing/pricing.component';
import { ContactComponent } from './components/contact/contact.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { AboutComponent } from './components/about/about.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    PricingComponent,
    ContactComponent,
    TestimonialsComponent,
    AboutComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
 
})
export class HomeModule { }
