import { Component } from '@angular/core';
import { ReservationInvoiceService } from '../../../../core/services/reservation-invoice.service';
import { SortType } from '@swimlane/ngx-datatable';
import { ReservationInvoiceDetailsDTO } from '../../../../core/DTO/reservation-invoice-details-dto';

@Component({
  selector: 'app-reservation-invoice',
  templateUrl: './reservation-invoice.component.html',
  styleUrl: './reservation-invoice.component.css'
})
export class ReservationInvoiceComponent {

  reservationInvoices: ReservationInvoiceDetailsDTO[] = [];
  columns = [
    { prop: 'studentName', name: 'Student Name' },
    { prop: 'studentEmail', name: 'Student Email' },
    { prop: 'examName', name: 'Exam Name' },
    { prop: 'examProviderName', name: 'Exam Provider' },
    { prop: 'value', name: 'Value' },
    { prop: 'createdAt', name: 'Created At', pipe: { transform: (value: Date) => new Date(value).toLocaleDateString() } }
  ];
  constructor(private reservationInvoiceService:ReservationInvoiceService) {
    this.getReservationInvoices();
  }
  protected readonly SortType = SortType;

  getReservationInvoices(): void {
    this.reservationInvoiceService.getReservationInvoices().subscribe(
      response => {
        this.reservationInvoices=response.data;
        console.log(`Exams by Provider ID :`, response);
      },
      error => {
        this.reservationInvoices=[]
        console.error(`Error fetching exams by provider ID :`, error);
      }
    );
  }

  updateFilter(event: any) {

  }

}
