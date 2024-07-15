import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GenericApiHandlerService } from './api.service';
import { CurrentUserData } from '../models/current-user-data';
import { UpdateNameViewModel } from '../DTO/update-name-view-model';
import { UpdateEmailViewModel } from '../DTO/UpdateEmailViewModel';
import { UpdatePhoneViewModel } from '../DTO/Update-Phone-View-Model';
import { GetUserByCredential } from '../DTO/get-user-by-credential';
import { ApiResponse } from '../utils/ApiResponse';
import { CreateAccountViewModel } from '../DTO/create-account-view-model';
import { API_ENDPOINTS } from '../constants/api.constants';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: CurrentUserData | null = null;

  constructor(private apiHandler: GenericApiHandlerService, private  cache : LocalStorageService) { }

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
          this.setToken(response.data.token);
          this.setCurrentUser(response.data);
        })
      );
  }
  updateUser(data: UpdateNameViewModel): Observable<ApiResponse<UpdateNameViewModel>> {
    return this.apiHandler.put<ApiResponse<UpdateNameViewModel>>(API_ENDPOINTS.UPDATE_NAME, data);
  }
  updateEmail(data: UpdateEmailViewModel): Observable<ApiResponse<UpdateEmailViewModel>> {
    return this.apiHandler.put<ApiResponse<UpdateEmailViewModel>>(API_ENDPOINTS.UPDATE_Email, data);
  }
  updatePhone(data: UpdatePhoneViewModel): Observable<ApiResponse<UpdatePhoneViewModel>> {
    return this.apiHandler.put<ApiResponse<UpdatePhoneViewModel>>(API_ENDPOINTS.UPDATE_PHONE, data);
  }

  private setToken(token: string): void {
    this.cache.setItem(this.cache.AUTH_TOKEN, token);
  }

  private setCurrentUser(user: CurrentUserData): void {
    this.currentUser = user;
  }

  getCurrentUser(): CurrentUserData | null {
    return this.currentUser;
  }

  getToken(): string | null {
    return this.cache.getItem(this.cache.AUTH_TOKEN);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.cache.removeItem(this.cache.AUTH_TOKEN);
    this.currentUser = null;
  }
}
