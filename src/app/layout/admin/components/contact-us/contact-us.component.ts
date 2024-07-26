import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { ContactService } from '../../../../core/services/contact.service';
import { ToastMsgService } from '../../../../core/services/toast.service';
import { APP_MESSAGES } from '../../../../core/constants/error-messages.constants';
import { ApiResponse } from '../../../../core/utils/ApiResponse';
import {ColumnMode, SortType} from '@swimlane/ngx-datatable';
import { ContactModel } from '../../../../core/models/contact-us-model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ContactUsComponent implements OnInit {
  deleteContactId: number | null = null;


  contactMsgs: ContactModel[] = [];
  AppMessages = APP_MESSAGES;
  rows: any[] = [];
  temp: any[] = [];
  columns = [
    { prop: 'name', name: 'Name' },
    { prop: 'email', name: 'Email' },
    { prop: 'subject', name: 'Subject' },
    { prop: 'message', name: 'Message' },
    { prop: 'createdAt', name: 'Created At' }
  ];
  ColumnMode = ColumnMode;
  @ViewChild('table') table: any;
  expanded: any = {};

  constructor(
    private callApi: ContactService,
    private toast: ToastMsgService
  ) { }

  ngOnInit(): void {
    this.loadMessage();
  }

  loadMessage() {
    this.callApi.getAll().subscribe((response: ApiResponse<ContactModel[]>) => {
      if (response.status === 200) {
        this.rows = this.transformData(response.data);
        this.temp = [...this.rows];
      } else {
        console.error('Failed to load contact data:', response.message);
      }
    });
  }

  updateFilter(event: Event): void {
    const val = (event.target as HTMLInputElement).value.toLowerCase();
    const temp = this.temp.filter((d) => {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  transformData(data: ContactModel[]): any[] {
    return data.map(msg => ({
      contactId: msg.contactId,
      name: msg.name,
      message: msg.message,
      subject: msg.subject,
      email: msg.email,
      createdAt: new Date(msg.createdAt).toLocaleString()
    }));
  }

  setDeleteContactId(id: number): void {
    this.deleteContactId = id;
    console.log(this.deleteContactId);
  }


  delete(): void {
    if (!this.deleteContactId) {
      return;
    }

    this.callApi.delete(this.deleteContactId).subscribe(
      (response: ApiResponse<any>) => {
        if (response.status === 200) {
          this.loadMessage();
          this.toast.showSuccess(response.message);
        } else {
          this.toast.showError(this.AppMessages.YOU_CANT_DELETED_NOW);
        }
      },
      error => {
        console.error('Delete error:', error);
        this.toast.showError(this.AppMessages.YOU_CANT_DELETED_NOW);
      }
    );
  }

    protected readonly SortType = SortType;
}
