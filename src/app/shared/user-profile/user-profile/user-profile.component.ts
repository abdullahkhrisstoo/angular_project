import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../../../core/services/user-role.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userRole: number | null = null;

  constructor(public userRoleService: UserRoleService) { }

  ngOnInit(): void {
    this.userRoleService.userRole$.subscribe(role => {
      this.userRole = role ?? null;
      console.log('Determined User Role:', this.userRole);
    });
  }

  getUserDashboard(): string {
    if (this.userRole === null) {
      return "Loading..."; 
    }

    switch (this.userRole) {
      case this.userRoleService.adminRole:
        return "Admin Setting";
      case this.userRoleService.examProviderRole:
        return "Exam Provider Setting";
      case this.userRoleService.proctorRole:
        return "Proctor Setting";
      default:
        console.error('Invalid user role:', this.userRole);
        return "Unknown Role";
    }
  }
}
