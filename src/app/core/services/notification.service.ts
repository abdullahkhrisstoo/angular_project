import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private hubConnection: HubConnection;
  private notificationSubject = new Subject<any>();

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${API_ENDPOINTS.baseUrlImage}reservationNotificationHub`, {
        accessTokenFactory: () => {
          return localStorage.getItem('auth-token') || '';
        }
      })
      .build();

    this.hubConnection.on('ReceiveReservationNotification', (reservationDetails) => {
      console.log('Notification received:', reservationDetails);
      this.notificationSubject.next(reservationDetails);
    });

    this.startConnection();
  }

  private startConnection(): void {
    this.hubConnection.start().catch(err => console.error('Error while starting connection: ' + err));
  }

  get notifications$(): Observable<any> {
    return this.notificationSubject.asObservable();
  }
}
