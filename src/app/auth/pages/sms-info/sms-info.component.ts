import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sms-info',
  templateUrl: './sms-info.component.html',
  styleUrls: ['./sms-info.component.scss'],
})
export class SmsInfoComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }
}
