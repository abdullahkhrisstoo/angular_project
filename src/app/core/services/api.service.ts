import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API_ENDPOINTS } from '../constants/api.constants';
import { response } from 'express';
import { ToastMsgService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class GenericApiHandlerService {

  constructor(private http: HttpClient,private toast:ToastMsgService) { }

  private handleError(error: HttpErrorResponse): Observable<never> {

    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.error.message}`;
    }

   
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  private setHeaders(customHeaders?: { [key: string]: string }): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (customHeaders) {
      headers = Object.keys(customHeaders).reduce((acc, key) => acc.set(key, customHeaders[key]), headers);
    }

    return headers;
  }

  private apiUrl(endpoint: string): string {
    return `${API_ENDPOINTS.baseUrl}${endpoint}`;
  }

  get<T>(endpoint: string, params?: any, customHeaders?: { [key: string]: string }): Observable<T> {
    const headers = this.setHeaders(customHeaders);
    const url = this.apiUrl(endpoint);
    const options = { headers, params };
    return this.http.get<T>(url, options).pipe(
      
      catchError(this.handleError)
    );
  }

  post<T>(endpoint: string, body: any, customHeaders?: { [key: string]: string }): Observable<T> {
    const headers = this.setHeaders(customHeaders);
    const url = this.apiUrl(endpoint);
  
    return this.http.post<T>(url, body, { headers, observe: 'response' }).pipe(
      tap(response => {
        // Check if status code is in the 2xx range
        if (response.status >= 200 && response.status < 300) {
          this.toast.showSuccess("the process has been successfully")

        } else {
          this.toast.showError("there is a problem")
          console.log('Response is not successful');
        }
      }),
      // Map the response back to the body
      map(response => response.body as T),
      catchError(error => {
        this.toast.showError("There is a problem");
        console.error('Handling error:', error);
        return this.handleError(error);
      })
    );
  }

  put<T>(endpoint: string, body: any, customHeaders?: { [key: string]: string }): Observable<T> {
    const headers = this.setHeaders(customHeaders);
    const url = this.apiUrl(endpoint);
  
    return this.http.put<T>(url, body, { headers, observe: 'response' }).pipe(
      tap(response => {
        // Check if status code is in the 2xx range
        if (response.status >= 200 && response.status < 300) {
          this.toast.showSuccess("the process has been successfully")

        } else {
          this.toast.showError("there is a problem")
          console.log('Response is not successful');
        }
      }),
      // Map the response back to the body
      map(response => response.body as T),
      catchError(error => {
        this.toast.showError("There is a problem");
        console.error('Handling error:', error);
        return this.handleError(error);
      })
    );
  }


  delete<T>(endpoint: string, params?: any, customHeaders?: { [key: string]: string }): Observable<T> {
    const headers = this.setHeaders(customHeaders);
    const url = this.apiUrl(endpoint);
    const options = { headers, params, observe: 'response' as 'response' };
  
    return this.http.delete<T>(url, options).pipe(
      tap(response => {
        // Check if status code is in the 2xx range
        if (response.status >= 200 && response.status < 300) {
          this.toast.showSuccess("the process has been successfully")

        } else {
          this.toast.showError("there is a problem")
          console.log('Response is not successful');
        }
      }),
      // Map the response back to the body
      map(response => response.body as T),
      catchError(error => {
        this.toast.showError("There is a problem");
        console.error('Handling error:', error);
        return this.handleError(error);
      })
    );
  }
  // delete<T>(endpoint: string, params?: any, customHeaders?: { [key: string]: string }): Observable<T> {
  //   const headers = this.setHeaders(customHeaders);
  //   const url = this.apiUrl(endpoint);
  //   const options = { headers, params };
  //   return this.http.delete<T>(url, options).pipe(
  //     catchError(this.handleError)
  //   );
  // }
}
