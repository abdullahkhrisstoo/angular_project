import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AboutUsService } from '../../../../../core/services/about-us.service';
import { ApiResponse } from '../../../../../core/utils/ApiResponse';
import { About } from '../../../../../core/models/about-us-model';

@Component({
  selector: 'app-read-all-about-us',
  templateUrl: './read-all-about-us.component.html',
  styleUrls: ['./read-all-about-us.component.css']
})
export class ReadAllAboutUsComponent implements OnInit {
  rows: any[] = [];
  temp: any[] = [];
  columns = [
    { prop: 'title', name: 'Title' },
    { prop: 'listitem', name: 'About Point' },
    { name: 'Actions' }
  ];
  ColumnMode = ColumnMode;
  @ViewChild('table') table: any;
  expanded: any = {};

  constructor(private callApi: AboutUsService) {}

  ngOnInit(): void {
    this.loadAboutData();
  }

  loadAboutData(): void {
    this.callApi.getAll().subscribe((response: ApiResponse<About[]>) => {
      if (response.status === 200) {
        console.log(response);
        this.rows = this.transformData(response.data);
        this.temp = [...this.rows];
      } else {
        console.error('Failed to load about data:', response.message);
      }
    });
  }

  transformData(data: About[]): any[] {
    return data.map(about => ({
      title: about.title,
      aboutpoints: about.aboutpoints
    }));
  }

  updateFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.value.toLowerCase();

    const temp = this.temp
      .map(group => ({
        ...group,
        aboutpoints: group.aboutpoints.filter((d: { listitem: string; }) =>
          d.listitem.toLowerCase().indexOf(val) !== -1 || !val
        )
      }))
      .filter(group => group.aboutpoints.length > 0);

    this.rows = temp;
    if (this.table) {
      this.table.offset = 0;
    }
  }

  update(item: any): void {
    console.log('Update:', item);
  }

  delete(item: any): void {
    console.log('Delete:', item);
  }

  create(): void {
    console.log('Create new item');
  }

  toggleExpand(row: any): void {
    this.expanded[row.title] = !this.expanded[row.title];
  }
}
