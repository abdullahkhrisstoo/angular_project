import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { TestimonalService } from '../../../../core/services/testimonal.service';
import { Testimonial } from '../../../../core/models/testimonal';

@Component({
  selector: 'app-about',
  templateUrl: './about-screen.component.html',
  styleUrl: './about-screen.component.css'
})
export class AboutComponent implements OnInit{
approvedTestimonal!:Testimonial[];

constructor(private callApi:TestimonalService){}

  ngOnInit(): void {
  this.loadApprovedTestimonal();
}
loadApprovedTestimonal():void {
  this.callApi.getApproved().subscribe((response: ApiResponse<Testimonial[]>) => {
    if (response.status === 200) {
      console.log(response)
      this.approvedTestimonal = response.data;
    } else {
      console.error('Failed to load about data:', response.message);
    }
  });
}
}
