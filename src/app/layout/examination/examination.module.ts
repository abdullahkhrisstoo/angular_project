import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExaminationRoutingModule } from './examination-routing.module';
import { ExaminationBodyComponent } from './components/examination-body/examination-body.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExaminationBodyComponent,


  ],
  imports: [
    CommonModule,
    ExaminationRoutingModule,
    FormsModule
  ],
  exports:[

    ExaminationBodyComponent,


  ]
})
export class ExaminationModule { }
