import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { TopexamService } from '../../../../core/services/topexam.service';
import { TopExamModle } from '../../../../core/models/TopExamModle';

@Component({
  selector: 'app-topexam',
  templateUrl: './topexam.component.html',
  styleUrls: ['./topexam.component.css']
})
export class TopexamComponent implements OnInit {
  TopExam!: TopExamModle[];

  constructor(private callApi: TopexamService) {}

  ngOnInit(): void {
    this.loadTopExam();
  }

  loadTopExam(): void {
    this.callApi.getAll().subscribe((response: ApiResponse<TopExamModle[]>) => {
      if (response.status === 200) {
        console.log(response);
        this.TopExam = response.data;
      } else {
        console.error('Failed to load top exam data:', response.message);
      }
    });
  }
}
