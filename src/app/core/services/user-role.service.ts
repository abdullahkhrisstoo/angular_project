import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ADMIN_ROLE, EXAM_PROVIDER_ROLE, PROCTOR_ROLE } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private userRoleSubject = new BehaviorSubject<number | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  adminRole: number = ADMIN_ROLE;
  examProviderRole: number = EXAM_PROVIDER_ROLE;
  proctorRole: number = PROCTOR_ROLE;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.determineUserRole();
    });
  }

  private determineUserRole(): void {
    const urlPath = this.router.url;
    console.log('Current URL Path:', urlPath);

    if (urlPath.includes('admin')) {
      this.userRoleSubject.next(this.adminRole);
    } else if (urlPath.includes('exam-provider')) {
      this.userRoleSubject.next(this.examProviderRole);
    } else if (urlPath.includes('proctor')) {
      this.userRoleSubject.next(this.proctorRole);
    } else {
      console.error('Invalid URL path:', urlPath);
      this.userRoleSubject.next(null);
    }

    console.log('Determined User Role:', this.userRoleSubject.value);
  }
  setUserRole(role: number): void {
    this.userRoleSubject.next(role);
  }
}
