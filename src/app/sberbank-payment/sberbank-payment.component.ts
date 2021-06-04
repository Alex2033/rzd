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
    const token = '7grue0rvn5jkach1fepdiv734c';
    const amount = 5000 * 100; // копейки убирают два нуля, поэтому домножать
    const returnUrl = 'https://www.google.com';
    const orderNumber = 2020;

    this.http
      .post(
        `https://3dsec.sberbank.ru/payment/rest/register.do?token=${token}&amount=${amount}&returnUrl=${returnUrl}&orderNumber=${orderNumber}`,
        {}
      )
      .subscribe((res) => {
        console.log('res:', res);
      });
  }
}
