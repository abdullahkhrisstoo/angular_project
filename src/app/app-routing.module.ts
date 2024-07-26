import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/Auth-guard';
import { ADMIN_ROLE } from './core/constants/app.constants';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./layout/admin/admin.module').then(m => m.AdminModule) ,
    // canActivate: [AuthGuard], data: { roles: [ADMIN_ROLE]},

  },
  {
    path: 'home',
    loadChildren: () => import('./layout/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'proctor',
    loadChildren: () => import('./layout/proctor/proctor.module').then(m => m.ProctorModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./layout/student/student.module').then(m => m.StudentModule)
  },
  {
    path: 'exam-provider',
    loadChildren: () => import('./layout/exam-provider/exam-provider.module').then(m => m.ExamProviderModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./layout/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
