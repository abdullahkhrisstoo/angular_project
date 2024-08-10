import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';


import { ProctorWorkTimeDTO } from '../../../core/DTO/proctor-work-time-dto';
import { ApiResponse } from '../../../core/utils/ApiResponse';
import { UpdateProctorWorkTimeDTO } from '../../../core/DTO/update-proctor-work-time-dto';
import { ProctorWorkTimeService } from '../../../core/services/proctor-work-time.service';
import { endTimeAfterStartTimeValidator } from '../../../core/constants/regex-patterns.constants';

@Component({
  selector: 'app-proctor-work-time',
  templateUrl: './proctor-work-time.component.html',
  styleUrls: ['./proctor-work-time.component.css']
})
export class ProctorWorkTimeComponent implements OnInit {
  proctorWorkTime!: ProctorWorkTimeDTO;
  updateProctorWorkTimeForm!: FormGroup;
  proctorWorkTimesId: number = 1;

  constructor(
    private proctorWorkTimeService: ProctorWorkTimeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateProctorWorkTimeForm = this.fb.group({
      workFrom: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
      workTo: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]]
    }, { validators: endTimeAfterStartTimeValidator });

    this.getProctorWorkTime();
  }

  getProctorWorkTime(): void {
    this.proctorWorkTimeService.getProctorWorkTimeById(this.proctorWorkTimesId).subscribe(
      (response: ApiResponse<ProctorWorkTimeDTO>) => {
        if (response.status === 200) {
          this.proctorWorkTime = response.data;
          this.updateProctorWorkTimeForm.patchValue({
            workFrom: this.proctorWorkTime.workFrom,
            workTo: this.proctorWorkTime.workTo
          });
        } else {
          console.error('Error fetching proctor work time', response.message);
        }
      },
      (error) => {
        console.error('Error fetching proctor work time', error);
      }
    );
  }

  updateProctorWorkTime(): void {
    if (this.updateProctorWorkTimeForm.valid) {
      const updateProctorWorkTimeDTO: UpdateProctorWorkTimeDTO = this.updateProctorWorkTimeForm.value;
      this.proctorWorkTimeService.updateProctorTimeWorkById(this.proctorWorkTimesId, updateProctorWorkTimeDTO).subscribe(
        (response: ApiResponse<any>) => {
          if (response.status === 200) {
            console.log('Proctor work time updated successfully', response.data);
            this.proctorWorkTime.workFrom = this.updateProctorWorkTimeForm.value.workFrom;
            this.proctorWorkTime.workTo = this.updateProctorWorkTimeForm.value.workTo;
          } else {
            console.error('Error updating proctor work time', response.message);
          }
        },
        (error) => {
          console.error('Error updating proctor work time', error);
        }
      );
    }
  }


}