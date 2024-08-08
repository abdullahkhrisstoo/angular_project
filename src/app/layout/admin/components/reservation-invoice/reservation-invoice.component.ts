import { Component, OnInit } from '@angular/core';
import { ReservationInvoiceService } from '../../../../core/services/reservation-invoice.service';
import { SortType } from '@swimlane/ngx-datatable';
import { ReservationInvoiceDetailsDTO } from '../../../../core/DTO/reservation-invoice-details-dto';
import { CommonUtils } from '../../../../core/utils/CommonUtils';

@Component({
  selector: 'app-reservation-invoice',
  templateUrl: './reservation-invoice.component.html',
  styleUrls: ['./reservation-invoice.component.css']
})
export class ReservationInvoiceComponent implements OnInit {

  reservationInvoices: ReservationInvoiceDetailsDTO[] = [];
  reservationInvoicesFilter: ReservationInvoiceDetailsDTO[] = [];
  columns = [
    { prop: 'studentName', name: 'Student Name' },
    { prop: 'studentEmail', name: 'Student Email' },
    { prop: 'examName', name: 'Exam Name' },
    { prop: 'examProviderName', name: 'Exam Provider' },
    { prop: 'value', name: 'Value' },
    { prop: 'createdAt', name: 'Created At', pipe: { transform: (value: Date) => new Date(value).toLocaleDateString() } }
  ];

  // Pagination properties
  page = 1;
  pageSize = 6;
  totalRows = 0;

  constructor(private reservationInvoiceService: ReservationInvoiceService) { }

  ngOnInit(): void {
    this.getReservationInvoices(this.page, this.pageSize);
  }

  protected readonly SortType = SortType;

  getReservationInvoices(page: number, size: number): void {
    this.reservationInvoiceService.getReservationInvoices(page, size).subscribe(
      response => {
        this.reservationInvoices = response.data;
        this.reservationInvoicesFilter=this.reservationInvoices;
        this.totalRows = response.totalCount;
        console.log(`Exams by Provider ID :`, response);
      },
      error => {
        this.reservationInvoices = [];
        console.error(`Error fetching exams by provider ID :`, error);
      }
    );
  }

  onPageChange(event: any): void {
    console.log(event)
    this.page = event.offset+1;
    this.pageSize = event.pageSize;
    this.getReservationInvoices(this.page, this.pageSize);
  }
  updateFilter(event: any) {
    let val = event.target.value.toLowerCase();
    this.reservationInvoices= CommonUtils.filterData(this.reservationInvoicesFilter,val)
  }
}
