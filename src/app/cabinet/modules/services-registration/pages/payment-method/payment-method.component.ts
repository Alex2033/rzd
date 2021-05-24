import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit {
  public selectedPayment: string;
  public isLoading: boolean = false;

  constructor(private location: Location) {}

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }
}
