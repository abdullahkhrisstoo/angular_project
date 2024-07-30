import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TimeSlotsService } from '../../../../core/services/time-slots.service';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { AvailableTimeDTO } from '../../../../core/DTO/available-time-dto';
import { parseISO, format, isValid } from 'date-fns';

declare var bootstrap: any;

@Component({
  selector: 'app-student-step-5',
  templateUrl: './student-step-5.component.html',
  styleUrls: ['./student-step-5.component.css']
})
export class StudentStep5Component implements OnInit {
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

  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    private timeSlotsService: TimeSlotsService
  ) {
    this.dateForm = this.fb.group({
      date: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.detectTimeZone();
    this.loadTimeSlots();
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
          console.log("this.timeSlot : "+this.timeSlots)

          if (this.timeSlots.length > 0) {
            const startTime = new Date(this.timeSlots[0].startTime!);
            this.recommendedTime = this.getRecommendedTimeString(startTime, this.duration, this.currentTimezone);
            this.checkInTimeString = this.getCheckInTimeString(startTime, this.currentTimezone);
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

  getRecommendedTimeString(startTime: Date, duration: number, timezone: string): string {
    const endTime = new Date(startTime.getTime() + duration * 60000);

    const formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const formattedEndTime = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return `${formattedStartTime} - ${formattedEndTime} ${timezone}`;
  }

  toggleTimeDropdown(): void {
    this.showAvailableTimesDropdown = !this.showAvailableTimesDropdown;
  }

  // selectTimeSlot(start: string, end: string): void {
  //   this.selectedTimeSlot = `${start} - ${end}`;
  //   console.log('Selected Time Slot:', this.selectedTimeSlot);
  // }
}
