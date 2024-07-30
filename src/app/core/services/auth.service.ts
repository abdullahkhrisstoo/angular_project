import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GenericApiHandlerService } from './api.service';
import { CurrentUserData } from '../models/current-user-data';
import { UpdateNameDTO } from '../DTO/update-name-dto';
import { UpdatePhoneDTO } from '../DTO/Update-Phone-dto';
import { GetUserByCredential } from '../DTO/get-user-by-credential';
import { ApiResponse } from '../utils/ApiResponse';
import { CreateAccountDTO } from '../DTO/create-account-dto';
import { API_ENDPOINTS } from '../constants/api.constants';
import { LocalStorageService } from './local-storage.service';
import { UpdateEmailDTO } from '../DTO/update-email-dto';
import { UpdatePasswordDTO } from '../DTO/update-password-dto';
import { EXAM_PROVIDER_ROLE } from '../constants/app.constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router: Router,private apiHandler: GenericApiHandlerService, private  cache : LocalStorageService) { }

  login(credentials: GetUserByCredential): Observable<ApiResponse<CurrentUserData>> {
    return this.apiHandler.post<ApiResponse<CurrentUserData>>(API_ENDPOINTS.GET_USER_BY_CREDENTIAL, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.data.token);
          this.setCurrentUser(response.data);
        })
      );
  }
  register(user: CreateAccountDTO): Observable<ApiResponse<CurrentUserData>> {
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
  updateUserName(data: UpdateNameDTO): Observable<ApiResponse<UpdateNameDTO>> {
    return this.apiHandler.put<ApiResponse<UpdateNameDTO>>(API_ENDPOINTS.UPDATE_NAME, data);
  }
  updateEmail(data: UpdateEmailDTO): Observable<ApiResponse<UpdateEmailDTO>> {
    return this.apiHandler.put<ApiResponse<UpdateEmailDTO>>(API_ENDPOINTS.UPDATE_Email, data);
  }
  updatePhone(data: UpdatePhoneDTO): Observable<ApiResponse<UpdatePhoneDTO>> {
    return this.apiHandler.put<ApiResponse<UpdatePhoneDTO>>(API_ENDPOINTS.UPDATE_PHONE, data);
  }

  updatePassword(data: UpdatePasswordDTO): Observable<ApiResponse<UpdatePasswordDTO>> {
    return this.apiHandler.put<ApiResponse<UpdatePasswordDTO>>(API_ENDPOINTS.UPDATE_PASSWORD, data);
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
}
