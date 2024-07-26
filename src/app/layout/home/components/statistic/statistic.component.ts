import {  Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { StatisticModel } from '../../../../core/models/statistic-model';
import { StatisticService } from '../../../../core/services/statistic.service';
declare var PureCounter: any;

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  statistics!: StatisticModel;

  constructor(
    private statisticService: StatisticService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }


  loadData(): void {
    this.statisticService.getAll().subscribe((response: ApiResponse<StatisticModel>) => {
      if (response.status === 200) {
        this.statistics = response.data;
        this.setCounterAttributes();
        this.initializePureCounter();
      } else {
        console.error('Failed to load statistics data:', response.message);
      }
    });
  }

  setCounterAttributes(): void {
    const counters = this.el.nativeElement.querySelectorAll('.purecounter');
    if (counters.length > 0) {
      this.renderer.setAttribute(counters[0], 'data-purecounter-end', this.statistics.allStudentCount.toString());
      this.renderer.setAttribute(counters[1], 'data-purecounter-end', this.statistics.allProctorCount.toString());
      this.renderer.setAttribute(counters[2], 'data-purecounter-end', this.statistics.allExamProviderCount.toString());
      this.renderer.setAttribute(counters[3], 'data-purecounter-end', this.statistics.allExamProviderCount.toString());
    }
  }

  initializePureCounter(): void {
    new PureCounter();
  }
}
