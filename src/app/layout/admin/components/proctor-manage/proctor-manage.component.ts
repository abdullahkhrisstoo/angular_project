import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ColumnMode, SortType} from '@swimlane/ngx-datatable';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProctorService } from '../../../../core/services/proctor.service';
import { ToastMsgService } from '../../../../core/services/toast.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CreateAccountViewModel } from '../../../../core/DTO/create-account-view-model';
import { APP_MESSAGES } from '../../../../core/constants/error-messages.constants';
import { EMAIL_CONTROL, FIRST_NAME_CONTROL, LAST_NAME_CONTROL, PASSWORD_CONTROL, PHONE_CONTROL } from '../../../../core/constants/form-control.constant';
import { PROCTOR_ROLE } from '../../../../core/constants/app.constants';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { ProctorModel } from '../../../../core/models/proctor-model';
import { CurrentUserData } from '../../../../core/models/current-user-data';
import {UpdateAccountDTO} from "../../../../core/DTO/update-account-dto";

@Component({
  selector: 'app-proctor-manage',
  templateUrl: './proctor-manage.component.html',
  styleUrls: ['./proctor-manage.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ProctorManageComponent implements OnInit {
  AppMessages = APP_MESSAGES;
  proctorForm: FormGroup;
  // updateProctorForm: FormGroup;

  deleteProctorId: number | null = null;
  updateProctorId: number | null = null;
  updateProctorData: CreateAccountViewModel | null = null;

  rows: any[] = [];
  temp: any[] = [];
  columns = [
    { prop: 'firstName', name: 'First Name' },
    { prop: 'lastName', name: 'Last Name' },
    { prop: 'email', name: 'Email' },
    { prop: 'phonenum', name: 'phonenum'as'Phone No.' },
    { prop: 'createdAt', name: 'Created At' }
  ];

  ColumnMode = ColumnMode;
  @ViewChild('table') table: any;

  constructor(
    private callApi: ProctorService,
    private fb: FormBuilder,
    private toast: ToastMsgService,
    private proctorAuth: AuthService
  ) {
    this.proctorForm = this.fb.group({
      firstName: FIRST_NAME_CONTROL,
      lastName: LAST_NAME_CONTROL,
      email: EMAIL_CONTROL,
      phonenum: PHONE_CONTROL,
      password: PASSWORD_CONTROL
    });
  }

  ngOnInit(): void {
    this.loadProctorData();
  }

  loadProctorData(): void {
    this.callApi.getAll().subscribe(
      (response: ApiResponse<ProctorModel[]>) => {
        if (response.status === 200) {
          this.rows = this.transformData(response.data);
          this.temp = [...this.rows];
        } else {
          console.error('Failed to load proctor data:', response.message);
        }
      },
      error => {
        console.error('API error:', error);
      }
    );
  }

  transformData(data: ProctorModel[]): any[] {
    return data.map(proctor => ({
      firstName: proctor.firstName,
      lastName: proctor.lastName,
      email: proctor.credential?.email,
      phonenum: proctor.credential?.phonenum,
      createdAt: proctor.createdAt?.replace('T',' ') ,
      userId: proctor.userId,
    }));
  }

  updateFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.value.toLowerCase();

    const temp = this.temp.filter(proctor =>
      proctor.firstName.toLowerCase().includes(val) ||
      proctor.lastName.toLowerCase().includes(val) ||
      proctor.email.toLowerCase().includes(val) ||
      proctor.phonenum.toLowerCase().includes(val)
    );

    this.rows = temp;
    if (this.table) {
      this.table.offset = 0;
    }
  }

  populateFormWithData(): void {
    if (this.updateProctorData) {
      this.proctorForm.patchValue({
        firstName: this.updateProctorData.firstName,
        lastName: this.updateProctorData.lastName,
        email: this.updateProctorData.email,
        phonenum: this.updateProctorData.phonenum,
      });
    }
  }

  setDeleteProctorId(id: number): void {
    this.deleteProctorId = id;
  }

  setUpdateProctorData(data: CreateAccountViewModel, id: number): void {
    this.updateProctorData = data;
    this.updateProctorId = id;
    this.populateFormWithData();
  }

  updateProctor(): void {
    // if (this.proctorForm.invalid || !this.updateProctorId) {
    //   return;
    // }

    const formValue = this.proctorForm.value;
    const proctorViewModel: UpdateAccountDTO = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phonenum: formValue.phonenum,
      email: formValue.email,
      userId:this.updateProctorId!
    };

    this.callApi.update(this.updateProctorId!, proctorViewModel).subscribe(
      (response: ApiResponse<any>) => {

        if (response.status === 200) {
          this.loadProctorData();
        }
        this.proctorForm.reset();

      },
      error => {
        this.proctorForm.reset();

        console.error('Update error:', error);
      }
    );
  }

  generateProctor(): void {
    if (this.proctorForm.invalid) {
      return;
    }

    const user: CreateAccountViewModel = { ...this.proctorForm.value, roleId: PROCTOR_ROLE };

    this.proctorAuth.register(user).subscribe(
      (response: ApiResponse<CurrentUserData>) => {
        if (response.status === 200) {
          this.loadProctorData();
        }
        this.proctorForm.reset();
      },
      error => {
        console.error('Registration error:', error);
        this.proctorForm.reset();

      }
    );
  }
  resetForm(){

    this.proctorForm.reset();

  }
  delete(): void {
    if (!this.deleteProctorId) {
      return;
    }

    this.proctorAuth.deleteUser(this.deleteProctorId).subscribe(
      (response: ApiResponse<any>) => {
        if (response.status === 200) {
          this.loadProctorData();
        } else {
        }
      },
      error => {
        console.error('Delete error:', error);
      }
    );
  }

  protected readonly SortType = SortType;
}
