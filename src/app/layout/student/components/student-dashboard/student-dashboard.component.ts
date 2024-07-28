import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  layers = Array(10).fill(0); 
  currentLayer = 0;

  constructor() { }

  ngOnInit(): void {
  }

  previousLayer() {
    if (this.currentLayer > 0) {
      this.currentLayer--;
    }
  }

  nextLayer() {
    if (this.currentLayer < this.layers.length - 1) {
      this.currentLayer++;
    }
  }
}
