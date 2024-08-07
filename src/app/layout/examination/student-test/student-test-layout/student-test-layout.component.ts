import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { StudentService } from '../../../../core/services/student.service';
import { ExamInfoService } from '../../../../core/services/exam-info.service';
import { jwtDecode } from 'jwt-decode';
import { DARK_THEME, LIGHT_THEME } from '../../../../core/constants/app.constants';

@Component({
  selector: 'app-student-test-layout',
  templateUrl: './student-test-layout.component.html',
  styleUrls: ['./student-test-layout.component.css',
    '../../../../../../public/dashboard-assets/dist/libs/dropzone/dist/dropzone.css'

  ],
  encapsulation:ViewEncapsulation.None,
})
export class StudentTestLayoutComponent {
  lightTheme = LIGHT_THEME;
  darkTheme = DARK_THEME;
  studentName:String="";
  studentID:String="";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService:LocalStorageService,
    private studentService:StudentService,
    private examService:ExamInfoService
  ) {

    if(localStorage.getItem('examerDTO')){
      const examerDTO=JSON.parse(localStorage.getItem("examerDTO")!);
      this.studentName=examerDTO.StudentName;
      this.studentID=examerDTO.Email;
      console.log("sallam")

     }
    this.route.queryParams.subscribe(params => {
      const token = params['token'];


      if(token){

        console.log(token);

        const payload =jwtDecode(token)
        console.log(payload)
        localStorage.setItem("auth-token",token);
        const payloadJson=JSON.parse(JSON.stringify(payload));
        console.log(payloadJson);
        localStorage.setItem("examerDTO",JSON.stringify(payload));
        if(localStorage.getItem('examerDTO')){
      const examerDTO=JSON.parse(localStorage.getItem("examerDTO")!);
      this.studentName=examerDTO.StudentName;
      this.studentID=examerDTO.Email;
      console.log("sallam")

     }
        this.router.navigate(['./examination/student-test/check']);
      }

    });

   if(localStorage.getItem("auth-token") == null || localStorage.getItem("examerDTO")==null) {
      this.router.navigate(['/home']);
    }

   }



}
