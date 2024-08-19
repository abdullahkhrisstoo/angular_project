import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateComplementDTO } from '../../../../core/DTO/update-complement-dto';
import { ComplementService } from '../../../../core/services/complement.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {
  complaintText: string = '';
  isExpired: boolean = false;
  minutes: number = 10;
  seconds: number = 0;

  createComplementForm!: FormGroup;
  constructor(private router: Router, private fb: FormBuilder,private complainService:ComplementService) {
    this.createComplementForm = this.fb.group({
      studentDesc: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.startTimer();
  }
  updateComplemntByStudent() {



    const updateComplementDTO: UpdateComplementDTO = this.createComplementForm.value;

    const examerDTO=JSON.parse(localStorage.getItem("examerDTO")!);
    updateComplementDTO.examReservationId=examerDTO.ReservationId;

    this.complainService.updateComplementByStudent(updateComplementDTO).subscribe(
      (response) => {
        console.log("response: "+response.message);
        localStorage.clear();
        this.router.navigate(['/home']);
      },
      error => {
        console.error('API error:', error);
      }
    );
    //this.endCall();
  }
  // onSubmit() {
  //   if (this.complaintText.trim()) {
  //     // Handle the form submission logic here
  //     console.log('Complaint submitted:', this.complaintText);
  //     // Reset the form
  //     this.complaintText = '';
  //     alert('Your complaint has been submitted. We will review it and get back to you shortly.');
  //   } else {
  //     alert('Please enter your complaint.');
  //   }
  // }

  startTimer() {
    const countdown = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {
          this.isExpired = true;
          clearInterval(countdown);
          localStorage.clear();
          this.router.navigate(['/home']);  // Redirect to home after 10 minutes
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }
}
