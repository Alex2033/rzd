import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DocumentsOrderInterface } from '../types/documents-order.interface';
import { OrderResponseInterface } from './order-response.interface';
import { OrderInterface } from '../types/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  public langId: number;

  constructor(private http: HttpClient) {}

  createOrder(order: OrderInterface): Observable<OrderResponseInterface> {
    return this.http.post<OrderResponseInterface>(
      environment.api + 'api/order',
      order
    );
  }

  getDocuments(
    id: number,
    langId: number = this.langId
  ): Observable<DocumentsOrderInterface[]> {
    return this.http.get<DocumentsOrderInterface[]>(
      environment.api + `api/document?id_order=${id}&id_lang=${langId}`
    );
  }

  getHTML(
    orderId: number,
    anketaId: number,
    documentId: number,
    langId: number = this.langId
  ) {
    return this.http.get(
      environment.api +
        `api/document/html?id_order=${orderId}&id_anketa=${anketaId}&id_document=${documentId}&id_lang=${langId}`,
      { responseType: 'text' }
    );
  }
}
