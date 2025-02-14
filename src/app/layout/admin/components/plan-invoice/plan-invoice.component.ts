import { Component } from '@angular/core';
import { PlanInvoiceService } from '../../../../core/services/plan-invoice.service';
import { SortType } from '@swimlane/ngx-datatable';
import { PlanInvoiceDetailsDTO } from '../../../../core/DTO/plan-invoice-details-dto';
import { CommonUtils } from '../../../../core/utils/CommonUtils';

@Component({
  selector: 'app-plan-invoice',
  templateUrl: './plan-invoice.component.html',
  styleUrl: './plan-invoice.component.css'
})
export class PlanInvoiceComponent {

  planInvoices: PlanInvoiceDetailsDTO[] = [];
  planInvoicesFilter: PlanInvoiceDetailsDTO[] = [];
  columns = [
    { prop: 'planName', name: 'Plan Name' },
    { prop: 'examProviderName', name: 'Exam Provider' },
    { prop: 'value', name: 'Value' },
    { prop: 'createdAt', name: 'Created At', pipe: { transform: (value: Date) => new Date(value).toLocaleDateString() } }
  ];


  constructor(private planInvoiceService:PlanInvoiceService) {


    this.getPlanInvoices();
  }

  getPlanInvoices(): void {
    this.planInvoiceService.getPlanInvoices().subscribe(
      response => {
        this.planInvoices=response.data;
        this.planInvoicesFilter=this.planInvoices;
        console.log(`Exams by Provider ID :`, response);
      },
      error => {
        this.planInvoices=[]
        console.error(`Error fetching exams by provider ID :`, error);
      }
    );
  }

  updateFilter(event: any) {
    let val = event.target.value.toLowerCase();
    this.planInvoices= CommonUtils.filterData(this.planInvoicesFilter,val)
  }

  protected readonly SortType = SortType;
}
