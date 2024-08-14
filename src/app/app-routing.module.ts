import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/Auth.guard';
import { ADMIN_ROLE, EXAM_PROVIDER_ROLE, EXAMER_ROLE, PROCTOR_ROLE, STUDENT_ROLE } from './core/constants/app.constants';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./layout/admin/admin.module').then(m => m.AdminModule) ,
    canActivate: [AuthGuard], data: { roles: [ADMIN_ROLE] }
  },
  {
    path: 'home',
    loadChildren: () => import('./layout/home/home.module').then(m => m.HomeModule),

  },
  {
    path: 'proctor',
    loadChildren: () => import('./layout/proctor/proctor.module').then(m => m.ProctorModule),
    canActivate: [AuthGuard], data: { roles: [PROCTOR_ROLE] }

  },
  {
    path: 'student',
    loadChildren: () => import('./layout/student/student.module').then(m => m.StudentModule),
  },
  {
    path: 'exam-provider',
    loadChildren: () => import('./layout/exam-provider/exam-provider.module').then(m => m.ExamProviderModule),
    canActivate: [AuthGuard], data: { roles: [EXAM_PROVIDER_ROLE] }

  },
  {
    path: 'auth',
    loadChildren: () => import('./layout/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'examination',
    loadChildren: () => import('./layout/examination/examination.module').then(m => m.ExaminationModule),
    // canActivate: [AuthGuard], data: { roles: [PROCTOR_ROLE, EXAMER_ROLE] }

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
