import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ColumnMode, id, SortType} from '@swimlane/ngx-datatable';
import { AboutUsService } from '../../../../core/services/about-us.service';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import { About } from '../../../../core/models/about-us-model';
import { CreateAboutDTO } from '../../../../core/DTO/create-about-us-dto';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_MESSAGES } from '../../../../core/constants/error-messages.constants';
import { ToastMsgService } from '../../../../core/services/toast.service';
import { ABOUT_US_TITLE } from '../../../../core/constants/form-control.constant';

@Component({
  selector: 'app-read-all-about-us',
  templateUrl: './read-all-about-us.component.html',
  styleUrls: ['./read-all-about-us.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ReadAllAboutUsComponent implements OnInit {
  aboutFormCreate: FormGroup;
  AppMessages = APP_MESSAGES;
  deleteAboutId: number | null = null;
  updateAboutId: number | null = null;
  updateAboutData: About | null = null;

  rows: any[] = [];
  temp: any[] = [];
  columns = [
    { prop: 'title', name: 'Title' },
    { prop: 'listitem', name: 'About Point' },
    { name: 'Actions' }
  ];

  ColumnMode = ColumnMode;
  @ViewChild('table') table: any;
  expanded: any = {};

  constructor(
    private callApi: AboutUsService,
    private fb: FormBuilder,
    private toast: ToastMsgService
  ) {
    this.aboutFormCreate = this.fb.group({
      title: ABOUT_US_TITLE,
      aboutPoints: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadAboutData();
  }

  loadAboutData(): void {

    this.callApi.getAll().subscribe((response: ApiResponse<About[]>) => {
      if (response.status === 200) {
        this.rows = this.transformData(response.data);
        this.temp = [...this.rows];
      } else {
        console.error('Failed to load about data:', response.message);
      }
      console.error("reloading")
    });
  }

  transformData(data: About[]): any[] {
    return data.map(about => ({
      title: about.title,
      aboutpoints: about.aboutpoints,
      aboutId:about.aboutId
    }));
  }

  updateFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const val = input.value.toLowerCase();

    const temp = this.temp
      .map(group => ({
        ...group,
        aboutpoints: group.aboutpoints.filter((d: { listitem: string }) =>
          d.listitem.toLowerCase().indexOf(val) !== -1 || !val
        )
      }))
      .filter(group => group.aboutpoints.length > 0);

    this.rows = temp;
    if (this.table) {
      this.table.offset = 0;
    }
  }

  toggleExpand(row: any): void {
    this.expanded[row.title] = !this.expanded[row.title];
  }



  update(): void {

    if (this.updateAboutId === null) {
      console.error('No update ID set.');
      return;
    }

    const formValue = this.aboutFormCreate.value;
    const aboutViewModel: CreateAboutDTO = {
      title: formValue.title,
      aboutPoints: formValue.aboutPoints.map((point: { listitem: string }) => point.listitem)
    };


    this.callApi.update(this.updateAboutId, aboutViewModel).subscribe(
      (response: ApiResponse<About>) => {
        console.log("response: About"+response.message);
        if (response.status === 200) {
          this.loadAboutData();
          this.toast.showSuccess(this.AppMessages.UPDATED_SUCCESSFULLY);
          this.aboutFormCreate.reset();

          this.updateAboutId = null;
        } else {
          console.error('Update failed:', response.message);
        }
      },
      error => {
        console.error('API error:', error);
        this.toast.showError(this.AppMessages.YOU_CANT_UPDATED_NOW);
      }
    );
  }


  populateFormWithData(): void {
    if (this.updateAboutData) {
      const { title, aboutpoints } = this.updateAboutData;

      this.aboutFormCreate.patchValue({ title });

      const aboutPointsArray = this.aboutFormCreate.get('aboutPoints') as FormArray;
      aboutPointsArray.clear();

      aboutpoints.forEach(point => {
        aboutPointsArray.push(this.fb.group({
          listitem: [point.listitem, Validators.required]
        }));
      });
    }
  }


  delete(): void {
    this.callApi.delete(this.deleteAboutId!).subscribe(
      (response: ApiResponse<CreateAboutDTO>) => {
        console.log(response);
        if (response.status === 200) {
          this.loadAboutData();
          this.deleteAboutId = null;
          this.toast.showSuccess(response.message);
        } else {
          console.error('delete:', response.message);
        }
      },
      error => {
        console.error('API error:', error);
        this.toast.showError(this.AppMessages.YOU_CANT_DELETED_NOW);
      }
    );
  }

  setDeleteAboutId(id: number): void {
    this.deleteAboutId=id;
    console.log(this.deleteAboutId);
  }
  setUpdateAboutData(data: About, id: number): void {
    this.updateAboutData = data;
    this.updateAboutId = id;
    this.populateFormWithData();
  }

  createAbout(): void {
    const formValue = this.aboutFormCreate.value;
    const aboutViewModel: CreateAboutDTO = {
      title: formValue.title,
      aboutPoints: formValue.aboutPoints.map((point: { listitem: string }) => point.listitem)
    };

    console.log('Submitting:', aboutViewModel);

    this.callApi.create(aboutViewModel).subscribe(
      (response: ApiResponse<CreateAboutDTO>) => {
        console.log(response);
        if (response.status === 200) {
          this.toast.showSuccess(this.AppMessages.CREATE_ABOUT_SUCCESS);
          this.aboutFormCreate.reset();
          this.loadAboutData();

          this.clearAboutPointsArray();

        } else {
          console.error('Create About failed:', response.message);
        }
      },
      error => {
        console.error('API error:', error);
        this.toast.showError(this.AppMessages.ERROR_CREATE_ABOUT);
      }
    );
  }

  get items(): FormArray {
    return this.aboutFormCreate.get('aboutPoints') as FormArray;
  }

  clearAboutPointsArray(): void {
    const aboutPointsArray = this.aboutFormCreate.get('aboutPoints') as FormArray;
    while (aboutPointsArray.length) {
      aboutPointsArray.removeAt(0);
    }
  }
  addItem() {
    const itemForm = this.fb.group({
      listitem: ['', Validators.required]
    });
    this.items.push(itemForm);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    console.log(this.aboutFormCreate.value);
  }


  initializeUpdateForm(data: About): void {
    this.aboutFormCreate.patchValue({
      title: data.title
    });

    this.clearAboutPointsArray();

    data.aboutpoints.forEach(point => {
      this.items.push(this.fb.group({
        listitem: [point.listitem, Validators.required]
      }));
    });
  }

  protected readonly SortType = SortType;
}
