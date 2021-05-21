import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderInterface } from '../types/order.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicesRegistrationService {
  public order: OrderInterface = { id: 0 } as OrderInterface;

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('rzd-order')) {
      this.order = JSON.parse(sessionStorage.getItem('rzd-order'));
    }
  }

  setOrder(data): void {
    this.order = { ...data };
    sessionStorage.setItem('rzd-order', JSON.stringify(this.order));
  }
}
