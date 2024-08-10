import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCogs, faUser, faIdCard, faHome, faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-check-in-process',
  templateUrl: './check-in-process.component.html',
  styleUrls: ['./check-in-process.component.css']
})
export class CheckInProcessComponent {
  faCogs = faCogs;
  faUser = faUser;
  faIdCard = faIdCard;
  faHome = faHome;
  faWindowClose = faWindowClose;

  constructor(library: FaIconLibrary, private router: Router) {
    library.addIcons(faCogs, faUser, faIdCard, faHome, faWindowClose);
  }

  checkInProcess(){
    this.router.navigate(['./examination/student-test/mic-test']);
  }
}
