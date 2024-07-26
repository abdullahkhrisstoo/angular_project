import { ADMIN_ROLE, EXAM_PROVIDER_ROLE, PROCTOR_ROLE } from '../../../core/constants/app.constants';
import { CurrentUserData } from '../../../core/models/current-user-data';
import { LocalStorageService } from './../../../core/services/local-storage.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent  {
  examProviderRole:number = EXAM_PROVIDER_ROLE;

  userRole: number | null = null;
  userData!:CurrentUserData;
  constructor(public cache: LocalStorageService) {
  this.userData= cache.getItem(cache.USER_SESSION_KEY)!;
  this.userRole=this.userData.roleId;

}


  getUserDashboard(): string {
    if (this.userRole === null) {
      return "Loading...";
    }

    switch (this.userRole) {
      case ADMIN_ROLE:
        return "Admin Setting";
      case EXAM_PROVIDER_ROLE:
        return "Exam Provider Setting";
      case PROCTOR_ROLE:
        return "Proctor Setting";
      default:
        console.error('Invalid user role:', this.userRole);
        return "Unknown Role";
    }
  }
}
