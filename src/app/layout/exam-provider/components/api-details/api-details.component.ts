import { Component } from '@angular/core';
import { ExamProviderLinkService } from '../../../../core/services/exam-provider-link.service';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { ExamProviderLinkDTO } from '../../../../core/DTO/exam-provider-link-dto';
import { UpdateExamProviderLinkDTO } from '../../../../core/DTO/update-exam-provider-link-dto';
import { forkJoin } from 'rxjs';
import { CurrentUserData } from '../../../../core/models/current-user-data';

@Component({
  selector: 'app-api-details',
  templateUrl: './api-details.component.html',
  styleUrls: ['./api-details.component.css']
})
export class ApiDetailsComponent {
  examProviderLinksDTO: ExamProviderLinkDTO[] = [];
  showInfoStates: boolean[] = [];
  jsonContent: { [key: number]: any } = {
    0: {
      "success": "boolean",
      "data": {
        "examId": "number",
        "examName": "string",
        "examDuration": "number",
        "examDescription": "string",
        "price": "number",
        "createdAt": "string",
        "updatedAt": "string",
        "deletedAt": "string"
      },
      "message": "string",
      "errors": "string"
    },
    1: {
      "success": "boolean",
      "data": [
        {
          "examName": "string",
          "examDuration": 25,
          "examDescription": "string",
          "price": "string",
          "questions": [
            {
              "questionDescription": "string",
              "questionId": "number",
              "questionLevel": "string",
              "questionType": "string",
              "examId": "number",
              "options": [
                {
                  "optionId": "number",
                  "title": "string"
                },
                {
                  "optionId": "number",
                  "title": "string"
                }
              ]
            }
          ]
        }
      ],
      "message": "string",
      "errors": "string"
    },
    2:{
      "success": "boolean",
      "data": [
        {
          "examId": "number",
          "examName": "string",
          "examDuration": "number",
          "price": "number",
          "examDescription": "string",
          "createdAt": "string",
          "updatedAt": "string",
          "deletedAt": "string",
          "questions": [
            {
              "questionId": "number",
              "questionDescription": "string",
              "questionLevel": "string",
              "questionType": "string",
              "examId": "number",
              "createdAt": "string",
              "updatedAt": "string",
              "deletedAt": "string",
              "questionOptions": [
                {
                  "optionId": "number",
                  "title": "string",
                  "isCorrect": "boolean",
                  "questionId": "number",
                  "createdAt": "string",
                  "updatedAt": "string",
                  "deletedAt": "string"
                }
              ]
            }
          ]
        }
      ],
      "message": "string",
      "errors": "string"
    },3:{
      "success": true,
      "data": {
        "userId": 0,
        "userName": "string",
        "birthDate": "string",
        "userEmail": "string",
        "createdAt": "2024-08-18T10:54:57.897Z"
      },
      "message": "string",
      "errors": {
        "additionalProp1": [
          "string"
        ],
        "additionalProp2": [
          "string"
        ],
        "additionalProp3": [
          "string"
        ]
      }
    },4:{
      "success": true,
      "data": {
        "userId": 0,
        "userName": "string",
        "birthDate": "string",
        "userEmail": "string",
        "createdAt": "2024-08-18T10:56:26.427Z"
      },
      "message": "string",
      "errors": {
        "additionalProp1": [
          "string"
        ],
        "additionalProp2": [
          "string"
        ],
        "additionalProp3": [
          "string"
        ]
      }
    }
  };

  constructor(private examProviderLinkService: ExamProviderLinkService, private localStorageService: LocalStorageService) {
    let userData = <CurrentUserData>this.localStorageService.getItem(this.localStorageService.USER_SESSION_KEY);
    if (userData.firstName) {
      this.getExamProviderLinkByCompanyName(userData.firstName);
    }
  }

  getExamProviderLinkByCompanyName(companyName: string) {
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

  toggleInfo(index: number) {
    this.showInfoStates[index] = !this.showInfoStates[index];
  }

  getJsonContent(index: number): any {
    return this.jsonContent[index] || {};
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
      () => {},
      error => {
        console.error('Error updating links:', error);
      }
    );
  }
}
