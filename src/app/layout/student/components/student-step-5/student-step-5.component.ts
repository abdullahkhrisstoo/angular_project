import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-student-step-5',
  templateUrl: './student-step-5.component.html',
  styleUrls: ['./student-step-5.component.css']
})
export class StudentStep5Component implements OnInit {
  currentTimezone!: string;
  timezones: string[] = [
    'Asia/Amman-EET', 'America/New_York', 'Europe/London', 'Asia/Tokyo'
  ];
  showTimezoneDropdown: boolean = false;
  selectedDate: string | null = null; // Use string for the date input value
  timeFormat: string = '24';
  recommendedTime: string = '08:00 - 09:05 Asia/Amman-EET';
  startTime: string = '08:00';
  endTime: string = '17:00';

  dateForm: FormGroup;

  constructor(private fb: FormBuilder, private el: ElementRef, private renderer: Renderer2) {
    this.dateForm = this.fb.group({
      date: new FormControl('')
    });
  }

  ngOnInit() {
    this.detectTimeZone();
  }

  detectTimeZone() {
    this.currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  changeTimezone() {
    this.showTimezoneDropdown = true;
  }

  selectTimezone(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.currentTimezone = target.value;
    this.showTimezoneDropdown = false;
  }

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedDate = target.value;
    this.dateForm.controls['date'].setValue(this.selectedDate);
  }

  onTimeFormatChange(format: string) {
    this.timeFormat = format;
    if (format === '12') {
      this.startTime = this.convertTo12HourFormat(this.startTime);
      this.endTime = this.convertTo12HourFormat(this.endTime);
    } else {
      this.startTime = this.convertTo24HourFormat(this.startTime);
      this.endTime = this.convertTo24HourFormat(this.endTime);
    }
  }

  openTimePicker() {
    const timePickerModal = new bootstrap.Modal(this.el.nativeElement.querySelector('#timePickerModal'));
    timePickerModal.show();
  }

  onTimeChange(event: Event, type: 'start' | 'end') {
    const input = event.target as HTMLInputElement;
    if (type === 'start') {
      this.startTime = input.value;
    } else {
      this.endTime = input.value;
    }
  }

  submitTimes() {
    const selectedTimes = `Start Time: ${this.startTime}, End Time: ${this.endTime}`;
    alert(selectedTimes);
  }

  private convertTo12HourFormat(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${period}`;
  }

  private convertTo24HourFormat(time: string): string {
    const [hourMinute, period] = time.split(' ');
    let [hour, minute] = hourMinute.split(':').map(Number);
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    }
    if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }
}
