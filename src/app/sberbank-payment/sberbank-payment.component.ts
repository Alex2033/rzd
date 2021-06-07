import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sberbank-payment',
  templateUrl: './sberbank-payment.component.html',
  styleUrls: ['./sberbank-payment.component.scss'],
})
export class SberbankPaymentComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  orderRegistration(): void {
    // const userName = 'T7716511464-api';
    // const password = 'T7716511464';
    const token = '7grue0rvn5jkach1fepdiv734c';
    const amount = 10000 * 100; // копейки убирают два нуля, поэтому домножать
    const returnUrl = 'https://lab.rzd-medicine.ru';
    const orderNumber = 20401;

    this.http
      .post(
        `https://3dsec.sberbank.ru/payment/rest/register.do?token=${token}&amount=${amount}&returnUrl=${returnUrl}&orderNumber=${orderNumber}`,
        {}
      )
      .subscribe((res) => {
        console.log('res:', res);
      });
    // this.http
    //   .post(
    //     `https://3dsec.sberbank.ru/payment/rest/register.do?userName=${userName}&password=${password}&amount=${amount}&returnUrl=${returnUrl}&orderNumber=${orderNumber}`,
    //     {}
    //   )
    //   .subscribe((res) => {
    //     console.log('res:', res);
    //   });
  }
}
