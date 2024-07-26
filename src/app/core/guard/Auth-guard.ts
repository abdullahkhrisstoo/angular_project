import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './../services/local-storage.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cache: LocalStorageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let userToken:any = this.cache.getItem(this.cache.AUTH_TOKEN);

    if (!userToken) {
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(userToken);

      const userRoleId = Number(decodedToken.RoleId);

      const requiredRoles = next.data['roles'] as Array<number>;

      if (requiredRoles && !requiredRoles.includes(userRoleId)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token decoding error:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
// todo: example how to use
// const routes: Routes = [
//   { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { roles: [ADMIN_ROLE] } },
//   { path: 'exam-provider-dashboard', component: ExamProviderDashboardComponent, canActivate: [AuthGuard], data: { roles: [EXAM_PROVIDER_ROLE] } },
//   { path: 'proctor-dashboard', component: ProctorDashboardComponent, canActivate: [AuthGuard], data: { roles: [PROCTOR_ROLE] } },
//   { path: 'shared-dashboard', component: SharedDashboardComponent, canActivate: [AuthGuard], data: { roles: [ADMIN_ROLE, EXAM_PROVIDER_ROLE] } },
//   { path: 'unauthorized', component: UnauthorizedComponent },
//   { path: '**', redirectTo: '/unauthorized' }
// ];
