import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { PricingComponent } from './components/pricing/pricing.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'pricing', component: PricingComponent }   // { path: 'dashboard', component: HomeDashboardComponent },
      // { path: 'profile', component: HomeProfileComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
