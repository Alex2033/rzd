import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderInterface } from '../types/order.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicesRegistrationService {
  public order: OrderInterface = {} as OrderInterface;

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('rzd-order')) {
      this.order = JSON.parse(sessionStorage.getItem('rzd-order'));
    }
  }

  setOrder(data): void {
    this.order = { ...this.order, ...data };
    sessionStorage.setItem('rzd-order', JSON.stringify(this.order));
  }
}
