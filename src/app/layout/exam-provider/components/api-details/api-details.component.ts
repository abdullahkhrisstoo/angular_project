import { Component } from '@angular/core';
import { ExamProviderLinkService } from '../../../../core/services/exam-provider-link.service';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { ExamProviderLinkDTO } from '../../../../core/DTO/exam-provider-link-dto';
import { UpdateExamProviderLinkDTO } from '../../../../core/DTO/update-exam-provider-link-dto';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-api-details',
  templateUrl: './api-details.component.html',
  styleUrl: './api-details.component.css'
})
export class ApiDetailsComponent {
 
  
  examProviderLinksDTO: ExamProviderLinkDTO[] = [];
  constructor(private examProviderLinkService:ExamProviderLinkService, private localStorageService:LocalStorageService) {
   let companyName= localStorage.getItem("companyName");
   if(companyName){
    this.getExamProviderLinkByCompanyName(companyName)
   }
  
  }
  getExamProviderLinkByCompanyName(companyName:string){
    this.examProviderLinkService.getExamProviderLinkByCompany(companyName).subscribe(
      response => {
        this.examProviderLinksDTO = response.data;
        console.log(response);
      },
      error => {
        console.error('Error fetching complement by ExamReservationId:', error);
      }
    );
  }

  updateLinks() {
    const updateRequests = this.examProviderLinksDTO.map(link => {
      const updateDTO: UpdateExamProviderLinkDTO = {
        examProviderLinkId: link.examProviderLinkId,
        linkPath: link.linkPath,
        examProviderId: link.examProviderId,
        actionId: link.actionId
      };
      return this.examProviderLinkService.updateExamProviderLink(updateDTO).toPromise();
    });

    forkJoin(updateRequests).subscribe(
      () => {
        alert('Links updated successfully');
      },
      error => {
        console.error('Error updating links:', error);
      }
    );
  }

}
