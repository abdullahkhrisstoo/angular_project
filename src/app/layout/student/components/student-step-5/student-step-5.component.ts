import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TimeSlotsService } from '../../../../core/services/time-slots.service';
import { ApiResponse } from '../../../../core/utils/ApiResponse';

import { parseISO, format, isValid } from 'date-fns';
import { AvailableTimeDTO } from '../../../../core/DTO/available-time-dto';
import { Router } from '@angular/router';
import { ExamInfoService } from '../../../../core/services/exam-info.service';

declare var bootstrap: any;

@Component({
  selector: 'app-student-step-5',
  templateUrl: './student-step-5.component.html',
  styleUrls: ['./student-step-5.component.css']
})
export class StudentStep5Component implements OnInit {

  currentImage: string = '';

  duration: number = 30;
  checkInTimeString: string = '';
  selectedTimeSlot: string = '';
  showAvailableTimesDropdown: boolean = false;

  timeSlots: AvailableTimeDTO[] = [];
  currentTimezone!: string;
  timezones: string[] = ['Asia/Amman-EET', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];
  showTimezoneDropdown: boolean = false;
  selectedDate: string | null = null;
  recommendedTime: string = '08:00 - 09:05 Asia/Amman-EET';
  startTime: string = '08:00';
  endTime: string = '17:00';
  dateForm: FormGroup;
  minDate: string="";
  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    private timeSlotsService: TimeSlotsService,
    private router: Router,
    private examService:ExamInfoService
  ) {
    this.dateForm = this.fb.group({
      date: new FormControl('')
    });
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.detectTimeZone();
    this.updateImageBasedOnTime();

   if(localStorage.getItem("exam")){

    this.getExamByName(localStorage.getItem("exam")!)
   }
  }

  getExamByName(name:string){
    this.examService.getExamByName(name).subscribe(
      response => {
        // this.studentDTO = response.data;
        console.log(response);
        if(response.data.examDuration!=null){
         this.duration=response.data.examDuration;
         localStorage.setItem("examDto",(JSON.stringify(response.data)))
         this.loadTimeSlots();
        }
        else {
          throw new Error("duration is null")
        }


      },
      error => {

        console.error('Error fetching complement by ExamReservationId:', error);
        //this.router.navigate(['/home']);
      }
    );
  }
  loadTimeSlots(): void {
    this.setDefaultDateIfEmpty();

    const dateControlValue = this.dateForm.controls['date'].value;
    console.log('Date control value:', dateControlValue);

    try {
      const dateTime = parseISO(dateControlValue);
      if (!isValid(dateTime)) {
        console.error('Invalid date value:', dateControlValue);
        return;
      }

      const formattedDate = format(dateTime, 'yyyy-MM-dd');

      this.timeSlotsService.getAvaliableTime(formattedDate, this.duration, true).subscribe(
        (response: ApiResponse<AvailableTimeDTO[]>) => {

          // console.log(response);
          this.timeSlots=response.data;
          console.log(response.data)

          if (this.timeSlots.length > 0) {
            const startTime = new Date(this.timeSlots[0].startTime!);
            this.recommendedTime = this.getPresentedFormat(this.timeSlots[0].startTimeFormatted, this.timeSlots[0].endTimeFormatted, this.currentTimezone);
            localStorage.setItem("startTime",this.timeSlots[0].startTime!)
            localStorage.setItem("endTime",this.timeSlots[0].endTime!)
            localStorage.setItem("formatSelectedTime",this.recommendedTime)
            console.log(this.recommendedTime)
            this.checkInTimeString = this.getCheckInTimePresentedFormat(this.timeSlots[0].startTimeFormatted, this.currentTimezone);
          }
        },
        error => {
          console.error('Error:', error);
        }
      );
    } catch (e) {
      console.error('Error parsing date:', e);
    }
  }

  detectTimeZone(): void {
    this.currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  changeTimezone(): void {
    this.showTimezoneDropdown = true;
  }

  selectTimezone(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.currentTimezone = target.value;
    this.showTimezoneDropdown = false;

    if (this.timeSlots.length > 0) {
      const startTime = new Date(this.timeSlots[0].startTime!);
      this.checkInTimeString = this.getCheckInTimeString(startTime, this.currentTimezone);

      this.recommendedTime = this.getRecommendedTimeString(startTime, this.duration, this.currentTimezone);

    }
  }

  onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedDate = target.value;
    this.dateForm.controls['date'].setValue(this.selectedDate);
    localStorage.setItem("examDay",this.selectedDate)
    console.log("Selected date: " + this.dateForm.controls['date'].value);
    this.loadTimeSlots();
  }



  openTimePicker(): void {
    const timePickerModal = new bootstrap.Modal(this.el.nativeElement.querySelector('#timePickerModal'));
    timePickerModal.show();
  }

  onTimeChange(event: Event, type: 'start' | 'end'): void {
    const input = event.target as HTMLInputElement;
    if (type === 'start') {
      this.startTime = input.value;
    } else {
      this.endTime = input.value;
    }
  }

  submitTimes(): void {
    const selectedTimes = `Start Time: ${this.startTime}, End Time: ${this.endTime}`;
    alert(selectedTimes);
  }

  private setDefaultDateIfEmpty(): void {
    if (!this.dateForm.controls['date'].value) {
      const initialDate = new Date().toISOString().split('T')[0]; // Set to today's date in 'YYYY-MM-DD' format
      this.dateForm.controls['date'].setValue(initialDate);
      this.selectedDate = initialDate;
    }
  }


  getCheckInTimeString(startTime: Date, timezone: string): string {
    const checkInTime = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `Your check-in time will be ${checkInTime} ${timezone}`;
  }
  getCheckInTimePresentedFormat(formattedStartTime?:string, timezone?: string): string {
    // const checkInTime = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `Your check-in time will be ${formattedStartTime} ${timezone}`;
  }
  getRecommendedTimeString(startTime: Date, duration: number, timezone?: string): string {
    const endTime = new Date(startTime.getTime() + duration * 60000);

    const options = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Amman'
    };

    const formattedStartTime = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Amman'
  }).format(startTime);
    const formattedEndTime = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Amman'
  }).format(endTime);

    return `${formattedStartTime} - ${formattedEndTime} ${timezone}`;
  }

  getPresentedFormat(formattedStartTime?:string,formattedEndTime?:string,timezone?:string){

    return `${formattedStartTime} - ${formattedEndTime} ${timezone}`;
  }

  toggleTimeDropdown(): void {
    this.showAvailableTimesDropdown = !this.showAvailableTimesDropdown;
  }

  onNext(): void {
   // this.isSubmitted = true;
    if (localStorage.getItem("endTime") && localStorage.getItem("startTime")) {
      this.router.navigate(['/student/step-6']);
      console.log('Next button clicked');
    } else {
      console.log('Validation failed');
    }
  }

  onPrevious(): void {
    this.router.navigate(['/student/step-4']);
    console.log('Previous button clicked');
  }


  changeTime(time: AvailableTimeDTO) {
    this.recommendedTime = "";
    if (time && time.startTime) {
      const startTime = new Date(time.startTime!);

      this.recommendedTime = this.getPresentedFormat(time.startTimeFormatted, time.endTimeFormatted, 'Asia/Amman');
      this.checkInTimeString = this.getCheckInTimePresentedFormat(time.startTimeFormatted, 'Asia/Amman');

      console.log("start time", startTime);
      localStorage.setItem("startTime", time.startTime);
      localStorage.setItem("endTime", time.endTime!);
      localStorage.setItem("formatSelectedTime", this.recommendedTime);
      localStorage.setItem("time", (JSON.stringify(time)));
      console.log(this.recommendedTime);

      // Pass the startTime to updateImageBasedOnTime
      this.updateImageBasedOnTime(startTime);
    }
    console.log(time);
  }



    updateImageBasedOnTime(time?: Date) {
      const currentTime = time || new Date();
      const hour = currentTime.getHours();
      if (hour >= 0 && hour < 6) {
        this.currentImage = './image/morning.png';
      } else if (hour >= 6 && hour < 12) {
        this.currentImage = './image/midday.png';
      } else if (hour >= 12 && hour < 18) {
        this.currentImage = './image/afternoon.png';
      } else {
        this.currentImage = './image/evening.png';
      }
    }






  // selectTimeSlot(start: string, end: string): void {
  //   this.selectedTimeSlot = `${start} - ${end}`;
  //   console.log('Selected Time Slot:', this.selectedTimeSlot);
  // }
}
