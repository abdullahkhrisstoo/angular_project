import { Component, OnInit } from '@angular/core';
import { StatisticService } from '../../../../core/services/statistic.service';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { StatisticModel } from '../../../../core/models/statistic.statistic';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  statistics !: StatisticModel ;

  constructor(private statisticService: StatisticService) {}

  ngOnInit(): void {
    this.getAll();
  }
 
  getAll(): void {
    debugger;
    this.statisticService.getAll().subscribe((response: ApiResponse<StatisticModel>) => {
      if (response.status === 200) {
        this.statistics! = response.data!;
        console.log(response)
      } else {
        console.error('Failed to load statistics data:', response.message);
      }
    });
  }
}



