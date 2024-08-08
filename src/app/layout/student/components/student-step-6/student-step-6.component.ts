import { Component } from '@angular/core';
import { ExamInfoStructureDTO } from '../../../../core/DTO/exam-info-structure-dto';
import { StudentDTO } from '../../../../core/DTO/student-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamReservationService } from '../../../../core/services/exam-reservation.service';
import { CardInfoDTO } from '../../../../core/DTO/card-info-dto';
import { ExamReservationPaymentDTO } from '../../../../core/DTO/exam-reservation-payment-dto';
import { AvailableTimeDTO } from '../../../../core/DTO/available-time-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-step-6',
  templateUrl: './student-step-6.component.html',
  styleUrl: './student-step-6.component.css'
})
export class StudentStep6Component {

// examDto?:ExamInfoStructureDTO;
// studentDto?:StudentDTO;
// examDay:string='';
// formatSelectedTime:string='';



// constructor(){


//   this.studentDto= JSON.parse(localStorage.getItem("studentDto")!);
//   this.examDto=JSON.parse(localStorage.getItem("examDto")!);
//   this.formatSelectedTime=localStorage.getItem("formatSelectedTime")!;
//   this.examDay=localStorage.getItem("examDay")!;

//   console.log(localStorage.getItem("studentDto"))
//   console.log(localStorage.getItem("examDto"))
//   console.log(localStorage.getItem("formatSelectedTime"))
//   console.log(localStorage.getItem("startTime"))
//   console.log(localStorage.getItem("endTime"))
//   console.log(localStorage.getItem("examDay"))
// }


examReservationForm: FormGroup;
studentDto?: any;
examDto?: any;
examDay: string = '';
formatSelectedTime: string = '';
time?:AvailableTimeDTO;
constructor(
  private fb: FormBuilder,
  private examReservationService: ExamReservationService,
  private router:Router
) {

  

  this.examReservationForm = this.fb.group({
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    cardHolderName: ['', Validators.required],
    cardCvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
    cardExpireDate: ['', Validators.required]
  });
}
examLang:string='';
proctorLang:string='';

ngOnInit(): void {

  this.proctorLang=localStorage.getItem('proctor-lang')!;
  
  this.examLang=localStorage.getItem('exam-lang')!;
  this.studentDto = JSON.parse(localStorage.getItem("studentDto")!);
  this.examDto = JSON.parse(localStorage.getItem("examDto")!);
  this.formatSelectedTime = localStorage.getItem("formatSelectedTime")!;
  this.examDay = localStorage.getItem("examDay")!;
  this.time= JSON.parse(localStorage.getItem("time")!);
  console.log(this.studentDto);
  console.log(this.examDto);
  console.log(this.formatSelectedTime);
  console.log(localStorage.getItem("startTime"));
  console.log(localStorage.getItem("endTime"));
  console.log(this.examDay);
}

get cardNumber() {
  return this.examReservationForm.get('cardNumber')!;
}

get cardHolderName() {
  return this.examReservationForm.get('cardHolderName')!;
}

get cardCvv() {
  return this.examReservationForm.get('cardCvv')!;
}

get cardExpireDate() {
  return this.examReservationForm.get('cardExpireDate')!;
}

onSubmit() {
  if (this.examReservationForm.valid) {
    const cardInfoDTO: CardInfoDTO = {
      cardNumber: this.examReservationForm.value.cardNumber,
      cardExpireDate: this.examReservationForm.value.cardExpireDate,
      cardCvv: this.examReservationForm.value.cardCvv,
      cardHolderName: this.examReservationForm.value.cardHolderName
    };

    const examReservationDTO: ExamReservationPaymentDTO = {
      userId: this.studentDto.userId,
      studentEmail: this.studentDto.userEmail,
      studentName: this.studentDto.userName,
      examName: this.examDto.examName,
      examDuration: this.examDto.examDuration,
      price: this.examDto.price,
      cardInfoDTO: cardInfoDTO,
      startTime: this.time?.startTime!,
      endTime:  this.time?.endTime!,
      reservationDate:this.examDay 
    };

    this.examReservationService.createProcessExamReservation(examReservationDTO).subscribe(
      response => {

        setTimeout(()=>{
          //localStorage.clear();
          this.router.navigate(['/home']);
       
        }, 3100);
       
        console.log('Exam reservation created successfully', response);
      },
      error => {
        // Handle error response
        console.error('Error creating exam reservation', error);
      }
    );
  }
}
}
