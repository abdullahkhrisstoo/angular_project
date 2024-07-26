import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { TestimonialService } from '../../../../core/services/testimonial.service';
import { Testimonial } from '../../../../core/models/testimonal';
import {TestimonialWithExamProviderDTO} from "../../../../core/DTO/testimonial-with-exam-provider-dto";

@Component({
  selector: 'app-about',
  templateUrl: './about-screen.component.html',
  styleUrl: './about-screen.component.css'
})
export class AboutComponent implements OnInit{
  approvedTestimonial!: TestimonialWithExamProviderDTO[];
  randomTestimonial!: TestimonialWithExamProviderDTO;

  constructor(private testimonialService: TestimonialService) {}

  ngOnInit(): void {
    this.loadApprovedTestimonal();
  }

  loadApprovedTestimonal(): void {
    this.testimonialService.getTestimonialsByStateId(2)
      .subscribe((response: TestimonialWithExamProviderDTO[]) => {
        console.log(response);
        this.approvedTestimonial = response;
        this.getRandomTestimonial();
      });
  }

  getRandomTestimonial(): void {
    if (this.approvedTestimonial && this.approvedTestimonial.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.approvedTestimonial.length);
      this.randomTestimonial = this.approvedTestimonial[randomIndex];
      console.log(this.randomTestimonial);
    }
  }
}
