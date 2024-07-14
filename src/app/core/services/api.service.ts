
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EXPIRY_TIME_CACHE } from '../constants/app.constants';
import { API_ENDPOINTS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class GenericApiHandlerService {
  private cache = new Map<string, any>();
  private cacheExpiry = new Map<string, number>();
  

  constructor(private http: HttpClient) { }

  private setHeaders(customHeaders?: { [key: string]: string }): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (customHeaders) {
      for (const key of Object.keys(customHeaders)) {
        headers = headers.set(key, customHeaders[key]);
      }
    }

    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(`Error occu+9rred: ${errorMessage}`);
    return throwError(errorMessage);
  }

  private buildUrl(endpoint: string): string {
    return `${API_ENDPOINTS.baseUrl}${endpoint}`;
  }

  private isCacheValid(cacheKey: string): boolean {
    const expiry = this.cacheExpiry.get(cacheKey);
    if (expiry && expiry > Date.now()) {
      return true;
    }
    this.cache.delete(cacheKey);
    this.cacheExpiry.delete(cacheKey);
    return false;
  }

  get<T>(endpoint: string, params?: { [param: string]: string | string[] }, customHeaders?: { [key: string]: string }, cacheExpiryTime?: number): Observable<T> {
    const headers = this.setHeaders(customHeaders);
    const url = this.buildUrl(endpoint);
    const options = {
      headers: headers,
      params: new HttpParams({ fromObject: params })
    };

    const cacheKey = `${url}?${options.params.toString()}`;
    if (this.cache.has(cacheKey) && this.isCacheValid(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.http.get<T>(url, options).pipe(
      tap(response => {
        this.cache.set(cacheKey, response);
        this.cacheExpiry.set(cacheKey, Date.now() + (cacheExpiryTime || EXPIRY_TIME_CACHE));
      }),
      catchError(this.handleError)
    );
  }

  post<T>(endpoint: string, body: any, customHeaders?: { [key: string]: string }): Observable<T> {
    const headers = this.setHeaders(customHeaders);
    const url = this.buildUrl(endpoint);
    return this.http.post<T>(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  put<T>(endpoint: string, body: any, customHeaders?: { [key: string]: string }): Observable<T> {
    const headers = this.setHeaders(customHeaders);
    const url = this.buildUrl(endpoint);
    return this.http.put<T>(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  delete<T>(endpoint: string, params?: { [param: string]: string | string[] }, customHeaders?: { [key: string]: string }): Observable<T> {
    const headers = this.setHeaders(customHeaders);
    const url = this.buildUrl(endpoint);
    const options = {
      headers: headers,
      params: new HttpParams({ fromObject: params })
    };
    return this.http.delete<T>(url, options).pipe(
      catchError(this.handleError)
    );
  }
}
