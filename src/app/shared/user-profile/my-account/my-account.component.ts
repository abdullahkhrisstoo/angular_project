import { Component, OnInit } from '@angular/core';
import { UserRoleService } from '../../../core/services/user-role.service';
import { AuthService } from '../../../core/services/auth.service';
import { CurrentUserData } from '../../../core/models/current-user-data';
import { combineLatest, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userRole: number = 0;
  userData: CurrentUserData | null = null;
  updatePassPath: string = '';

  constructor(
    private userRoleService: UserRoleService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.userRoleService.userRole$,
      of(this.auth.getCurrentUser()).pipe(
        catchError(error => {
          console.error('Error fetching user data:', error);
          return of(null);
        })
      )
    ]).subscribe(([role, userData]) => {
      this.userRole = role ?? -1;
      this.userData = userData ?? null;
    });
    this.setProfilePath();
  }

  isExamProvider(): boolean {
    return this.userRole === this.userRoleService.examProviderRole;
  }

  getFullName(): string {
    return `${this.userData?.firstName ?? ''} ${this.userData?.lastName ?? ''}`;
  }
  private setProfilePath(): void {
    switch (this.userRole) {
      case this.userRoleService.adminRole:
        this.updatePassPath = '/admin/profile/update-password';
        break;
      case this.userRoleService.examProviderRole:
        this.updatePassPath = '/exam-provider/profile/update-password';
        break;
      case this.userRoleService.proctorRole:
        this.updatePassPath = '/proctor/profile/update-password';
        break;
      default:
        this.updatePassPath = '/';
        break;
    }
  }
  copyToken(): void {
    const token = this.userData?.token;

    if (token) {
      navigator.clipboard.writeText(token).then(() => {
        console.error('copy token done ');
      }).catch(err => {
        console.error('Failed to copy token: ', err);
      });
    } else {
      alert('No token available to copy.');
    }
  }

}
