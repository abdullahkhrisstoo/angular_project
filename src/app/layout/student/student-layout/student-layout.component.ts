import {Component, ViewEncapsulation} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import  { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { StudentService } from '../../../core/services/student.service';
import { StudentDTO } from '../../../core/DTO/student-dto';
import { ExamInfoService } from '../../../core/services/exam-info.service';
import { loadavg } from 'os';
@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css',
    '../../../../../public/dashboard-assets/dist/libs/plyr/dist/plyr.css',
    '../../../../../public/dashboard-assets/dist/css/tabler.min.css',
    '../../../../../public/dashboard-assets/dist/css/tabler-payments.min.css',
    '../../../../../public/dashboard-assets/dist/css/tabler-vendors.min.css',
    '../../../../../public/dashboard-assets/dist/css/demo.min.css',
    '../../../../../public/dashboard-assets/dist/libs/dropzone/dist/dropzone.css'

  ],
  encapsulation:ViewEncapsulation.None,
})
export class StudentLayoutComponent {
  studentDTO?:StudentDTO;
  studentName:String="";
  studentID:String="";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService:LocalStorageService,
    private studentService:StudentService,
    private examService:ExamInfoService
  ) {
    
   }

  ngOnInit(): void {
    // Extract the token from query parameters
       
    console.log('remove', 'load')

    this.removeScripts();
    this.loadScripts();

     if(localStorage.getItem('stuId') && localStorage.getItem('stuName')){
      this.studentName=localStorage.getItem('stuName')!;
      this.studentID=localStorage.getItem('company')!+"-"+localStorage.getItem('stuId')!;


     }


    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      
      const exam = decodeURIComponent(params['exam']);
  
      if(exam && token){

        console.log(token);
        console.log(exam);
        const payload =jwtDecode(token)
        console.log(payload)
        localStorage.setItem("auth-token",token);
        localStorage.setItem("exam",exam);
        const payloadJson=JSON.parse(JSON.stringify(payload));
       // this.getStudentInfoById(payload.userId);
        console.log(payloadJson.Company)
        localStorage.setItem("company",payloadJson.Company);
        localStorage.setItem("userId",payloadJson.UserId);
        localStorage.setItem("roleId",payloadJson.RoleId);
       // this.localStorageService.setItem("payload",payload);

        this.getStudentInfoById(payloadJson.UserId);
       
      }

      else if(localStorage.getItem("auth-token") == null) {
        this.router.navigate(['/home']);
      }
       
       


    });


 


  }

  
  getStudentInfoById(id:number){
    this.studentService.getStudentInfoById(id).subscribe(
      response => {
        this.studentDTO = response.data;
        console.log(response.data);
        this.studentName=this.studentDTO?.userName!;
        this.studentID=localStorage.getItem("company")+"-"+this.studentDTO?.userId!+"";
        localStorage.setItem("stuName",this.studentDTO?.userName!);
        localStorage.setItem("stuId",this.studentDTO?.userId!.toString());

        localStorage.setItem("studentDto",(JSON.stringify(this.studentDTO)))
        this.router.navigate(['/student/step-1']);
      },
      error => {
        
        console.error('Error fetching complement by ExamReservationId:', error);
        this.router.navigate(['/home']);
      }
    );
  }
  getStudentInfoByEmail(email:string){
    this.studentService.getStudentInfoByEmail(email).subscribe(
      response => {
        this.studentDTO = response.data;
        console.log(response);
        this.router.navigate(['/student/step-1']);
      },
      error => {
        
        console.error('Error fetching complement by ExamReservationId:', error);
        //this.router.navigate(['/home']);
      }
    );
  }

  
  getExamByName(email:string){
    this.examService.getExamByName(email).subscribe(
      response => {
        // this.studentDTO = response.data;
        console.log(response);
        this.router.navigate(['/student/step-1']);
      },
      error => {
        
        console.error('Error fetching complement by ExamReservationId:', error);
        //this.router.navigate(['/home']);
      }
    );
  }


  loadScripts() {
    const dynamicScripts = [
      'http://localhost:4200/dashboard-assets/dist/js/demo-theme.min.js',
      'http://localhost:4200/dashboard-assets/dist/js/tabler.min.js',
      'http://localhost:4200/dashboard-assets/dist/js/demo.min.js',
      'http://localhost:4200/dashboard-assets/dist/libs/dropzone/dist/dropzone-min.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('body')[0].appendChild(node);
    }
  }

  removeScripts() {


    const scripts = Array.from(document.getElementsByTagName('script'));
    scripts.forEach(script => {
      if (script != null && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });


  }


}
