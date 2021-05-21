import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderInterface } from '../types/order.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicesRegistrationService {
  public order$: BehaviorSubject<OrderInterface> =
    new BehaviorSubject<OrderInterface>({} as OrderInterface);

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('rzd-order')) {
      this.order$ = JSON.parse(sessionStorage.getItem('rzd-order'));
    }
  }

  getOrder(): Observable<OrderInterface> {
    return this.order$.asObservable();
  }

  setOrder(data): void {
    this.order$.next({ ...data });
    sessionStorage.setItem('rzd-order', JSON.stringify(this.order$));
  }
}
