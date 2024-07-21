import { Component, Input, OnInit } from '@angular/core';
import { AboutUsService } from '../../../../core/services/about-us.service';
import { About } from '../../../../core/models/about-us-model';
import { ApiResponse } from '../../../../core/utils/ApiResponse';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css'
})
export class AboutSectionComponent implements OnInit{
  @Input() count!: number ;

  about:About[]=[];
  constructor(private callApi:AboutUsService){
  }
  
  ngOnInit() {
    this.loadAboutUs();
  }

  loadAboutUs():void {
    this.callApi.getAll().subscribe((response: ApiResponse<About[]>) => {
      if (response.status === 200) {
        console.log(response)
        if (this.count == null || this.count <= 0) {
          this.about = response.data;
        } else {
          this.about = response.data.slice(0, this.count);
        }
      } else {
        console.error('Failed to load about data:', response.message);
      }
    });
  }
}
