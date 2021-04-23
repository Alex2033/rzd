import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderInterface } from '../types/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>('assets/mocks/orders.json');
  }

  getOrder(id: number): Observable<OrderInterface> {
    return this.getOrders().pipe(
      map((orders) => orders.find((order) => order.id === id))
    );
  }
}
