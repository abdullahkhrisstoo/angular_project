import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-score',
  templateUrl: './student-score.component.html',
  styleUrls: ['./student-score.component.css']
})
export class StudentScoreComponent implements OnInit {

  mark!: number;
  numberOfQuestion!: number | null;

  constructor(private cache: LocalStorageService , private router:Router) {}

  goToHome() {
    this.cache.clear();
    this.router.navigate(["**"]);
  }

  ngOnInit(): void {
    this.mark= this.cache.getItem(this.cache.STUDENT_SCORE) ?? 0;
    this.numberOfQuestion = this.cache.getItem(this.cache.NUMBER_OF_QUESTIONS);
  }


}
