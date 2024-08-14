import { Component, HostListener } from '@angular/core';
import {ExamProviderService} from "../../../../core/services/exam-provider.service";
import {ExamInfoService} from "../../../../core/services/exam-info.service";
import {ExamProviderDTO} from "../../../../core/DTO/exam-provider-dto";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  examProviders!:ExamProviderDTO[];
  sliderBody:string="Exams Made Easy";
  sliderTitle:string="Efficient and reliable online exams for students and educators.";
  constructor(private examProviderService:ExamProviderService) {
  }

  ngOnInit(): void {
    this.getAllExamProviders();

  }
  getAllExamProviders(){
    this.examProviderService.getAllExamProviders().subscribe(
      response => {
        this.examProviders = response.data;

        console.log(this.examProviders)
      },
      error => {
        this.examProviders =[]
        console.error('Error fetching exam providers:', error);
      }
    );
  }

}


