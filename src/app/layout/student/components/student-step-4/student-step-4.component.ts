import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-step-4',
  templateUrl: './student-step-4.component.html',
  styleUrl: './student-step-4.component.css'
})
export class StudentStep4Component implements OnInit {
  preferredLanguage: string | null = null;
  isSubmitted: boolean = false;

  languages = ['English', 'Japanese','Arabic'];

  constructor(private router: Router) {}
  ngOnInit(): void {
    const storedLanguage = localStorage.getItem('proctor-lang');
    if (storedLanguage) {
      this.preferredLanguage = storedLanguage;
    }
  }
  onNext(): void {
    this.isSubmitted = true;
    if (this.preferredLanguage) {
      localStorage.setItem('proctor-lang',this.preferredLanguage);
      this.router.navigate(['/student/step-5']);
      console.log('Next button clicked');
    } else {
      console.log('Validation failed');
    }
  }

  onPrevious(): void {
    this.router.navigate(['/student/step-3']);
    console.log('Previous button clicked');
  }
}
