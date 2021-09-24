import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DocumentsOrderInterface } from '../types/documents-order.interface';
import { FeedBackInterface } from '../types/feedback.interface';
import { OrderResponseInterface } from '../types/order-response.interface';
import { OrderInterface } from '../types/order.interface';
import { PaymentResponseInterface } from '../types/payment-response.interface';
import { PaymentInterface } from '../types/payment.interface';
import { SignInterface } from '../types/sign.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient, private translate: TranslateService) {}

  createOrder(order: OrderInterface): Observable<OrderResponseInterface> {
    return this.http.post<OrderResponseInterface>(
      environment.api + 'api/order',
      order
    );
  }

  getOrders(): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>(environment.api + 'api/order');
  }

  updateOrder(order: OrderInterface): Observable<void> {
    return this.http.put<void>(
      environment.api + `api/order/${order.id}`,
      order
    );
  }

  getDocuments(
    id: number,
    langId: string = this.translate.currentLang
  ): Observable<DocumentsOrderInterface[]> {
    return this.http.get<DocumentsOrderInterface[]>(
      environment.api + `api/document?id_order=${id}&id_lang=${langId}`
    );
  }

  getDocument(
    orderId: number,
    questionnaireId: number,
    documentId: number,
    langId: string = this.translate.currentLang
  ) {
    return this.http
      .get(
        environment.api +
          `api/document/pdf?id_order=${orderId}&id_anketa=${questionnaireId}&id_document=${documentId}&id_lang=${langId}`,
        { responseType: 'blob' }
      )
      .pipe(
        map((res) => {
          return new Blob([res], { type: 'application/pdf' });
        })
      );
  }

  getHTML(
    orderId: number,
    anketaId: number,
    documentId: number,
    langId: string = this.translate.currentLang
  ) {
    return this.http.get(
      environment.api +
        `api/document/html?id_order=${orderId}&id_anketa=${anketaId}&id_document=${documentId}&id_lang=${langId}`,
      { responseType: 'text' }
    );
  }

  sign(data: SignInterface): Observable<void> {
    return this.http.post<void>(environment.api + 'api/order/sign', data);
  }

  getOrder(id: number): Observable<OrderInterface> {
    return this.getOrders().pipe(
      map((orders) => orders.find((order) => order.id === id))
    );
  }

  pay(data: PaymentInterface): Observable<PaymentResponseInterface> {
    return this.http.post<PaymentResponseInterface>(
      environment.api + 'api/order/pay',
      data
    );
  }

  rePay(id: number): Observable<PaymentResponseInterface> {
    return this.http.post<PaymentResponseInterface>(
      environment.api + 'api/order/send',
      { id }
    );
  }

  addFeedBack(data: FeedBackInterface): Observable<number> {
    return this.http.post<number>(
      environment.api + 'api/order/AddFeedback',
      data
    );
  }

  checkMedmeStatus(id_order: number): Observable<any> {
    return this.http.post<any>(environment.api + 'api/order/CheckMedmeStatus', {
      id_order,
    });
  }

  checkPayStatus(id_order: number): Observable<any> {
    return this.http.post<any>(environment.api + 'api/order/CheckPayStatus', {
      id_order,
    });
  }
}
