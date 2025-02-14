import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GenericApiHandlerService } from './api.service';
import { CurrentUserData } from '../models/current-user-data';
import { UpdateNameViewModel } from '../DTO/update-name-view-model';
import { UpdatePhoneViewModel } from '../DTO/Update-Phone-View-Model';
import { GetUserByCredential } from '../DTO/get-user-by-credential';
import { ApiResponse } from '../utils/ApiResponse';
import { CreateAccountViewModel } from '../DTO/create-account-view-model';
import { API_ENDPOINTS } from '../constants/api.constants';
import { LocalStorageService } from './local-storage.service';
import { UpdateEmailViewModel } from '../DTO/update-email-view-model';
import { UpdatePasswordViewModel } from '../DTO/update-password-view-model';
import { EXAM_PROVIDER_ROLE } from '../constants/app.constants';
import { Router } from '@angular/router';
import { RegisterExamProviderDTO } from '../DTO/register-exam-provider-dto';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router: Router,private apiHandler: GenericApiHandlerService, private  cache : LocalStorageService,private http: HttpClient) { }

  login(credentials: GetUserByCredential): Observable<ApiResponse<CurrentUserData>> {
    return this.apiHandler.post<ApiResponse<CurrentUserData>>(API_ENDPOINTS.GET_USER_BY_CREDENTIAL, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.data.token);
          this.setCurrentUser(response.data);
        })
      );
  }
  register(user: CreateAccountViewModel): Observable<ApiResponse<CurrentUserData>> {
    return this.apiHandler.post<ApiResponse<CurrentUserData>>(API_ENDPOINTS.CREATE_ACCOUNT, user)
      .pipe(
        tap(response => {
          if(user.roleId===EXAM_PROVIDER_ROLE){
            this.setToken(response.data.token);
            this.setCurrentUser(response.data);
          }
        })
      );

  }


  registerExamProvider(data: FormData): Observable<ApiResponse<any>> {
    return  this.http.post<ApiResponse<any>>(`${API_ENDPOINTS.baseUrl}${API_ENDPOINTS.REGISTER_EXAM_PROVIDER}`, data);
  }

  updateUserName(data: UpdateNameViewModel): Observable<ApiResponse<UpdateNameViewModel>> {
    return this.apiHandler.put<ApiResponse<UpdateNameViewModel>>(API_ENDPOINTS.UPDATE_NAME, data);
  }
  updateEmail(data: UpdateEmailViewModel): Observable<ApiResponse<UpdateEmailViewModel>> {
    return this.apiHandler.put<ApiResponse<UpdateEmailViewModel>>(API_ENDPOINTS.UPDATE_Email, data);
  }
  updatePhone(data: UpdatePhoneViewModel): Observable<ApiResponse<UpdatePhoneViewModel>> {
    return this.apiHandler.put<ApiResponse<UpdatePhoneViewModel>>(API_ENDPOINTS.UPDATE_PHONE, data);
  }

  updatePassword(data: UpdatePasswordViewModel): Observable<ApiResponse<UpdatePasswordViewModel>> {
    return this.apiHandler.put<ApiResponse<UpdatePasswordViewModel>>(API_ENDPOINTS.UPDATE_PASSWORD, data);
  }

  deleteUser(id:number): Observable<ApiResponse<any>> {
    const endpoint = `${API_ENDPOINTS.DELETE_USER}/${id}`;
    return this.apiHandler.delete<ApiResponse<any>>(endpoint);
  }


  private setToken(token: string): void {
    this.cache.setItem(this.cache.AUTH_TOKEN, token);
  }

  private setCurrentUser(user: CurrentUserData): void {
    this.cache.setItem(this.cache.USER_SESSION_KEY,user);
  }

  getCurrentUser(): CurrentUserData | null {
    return this.cache.getItem(this.cache.USER_SESSION_KEY);
  }

  getToken(): string | null {
    return this.cache.getItem(this.cache.AUTH_TOKEN);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.cache.clear();
    console.log("dddd")
    this.router.navigate(['/auth/sign-in']);
  }



  registerExamProviderTest() {
    const formData = new FormData();
    formData.append('CreateAccountViewModel.FirstName', 'deaaa');
    formData.append('CreateAccountViewModel.Email', 'd123a123123aa45112@gmail.com');
    formData.append('CreateAccountViewModel.UserId', '45');
    formData.append('PlanId', '5');
    formData.append('CardInfoDTO.CardCvv', '123');
    formData.append('CardInfoDTO.CardNumber', '4556518604332453');
    formData.append('CardInfoDTO.CardExpireDate', '13/10');
    formData.append('CreateAccountViewModel.RoleId', '2');
    formData.append('CreateAccountViewModel.Phonenum', '4444444446');
    formData.append('CardInfoDTO.CardHolderName', 'Deya');
    formData.append('CreateAccountViewModel.Password', '123456');
    formData.append('CreateAccountViewModel.LastName', 'aldeen');

  


    this.http.post(`${API_ENDPOINTS.baseUrl}${API_ENDPOINTS.REGISTER_EXAM_PROVIDER}`, formData)
      .subscribe(response => {
        console.log('Success', response);
      }, error => {
        console.error('Error', error);
      });
  }




}
