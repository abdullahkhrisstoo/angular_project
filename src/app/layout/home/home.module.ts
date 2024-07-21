import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { PricingComponent } from './components/pricing/pricing.component';
import { ContactComponent } from './components/contact/contact.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { AboutComponent } from './components/about-screen/about-screen.component';
import { SharedModule } from '../../shared/shared.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';


@NgModule({
  declarations: [
    PricingComponent,
    ContactComponent,
    TestimonialsComponent,
    AboutComponent,
    HomepageComponent,
    AboutSectionComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],

})
export class HomeModule { }
