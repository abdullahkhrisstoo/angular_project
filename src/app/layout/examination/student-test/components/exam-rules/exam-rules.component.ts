import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exam-rules',
  templateUrl: './exam-rules.component.html',
  styleUrls: ['./exam-rules.component.css']
})
export class ExamRulesComponent {
  faMobileAlt = faMobileAlt;
  
  isAgreed:boolean=false;
  constructor(library: FaIconLibrary,  private router: Router) {
    library.addIcons(faMobileAlt);
  }

  toggleAgreement(event: Event) {
    this.isAgreed = (event.target as HTMLInputElement).checked;
  }
}
