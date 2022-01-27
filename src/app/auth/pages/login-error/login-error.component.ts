import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login-error',
  templateUrl: './login-error.component.html',
  styleUrls: ['./login-error.component.scss'],
})
export class LoginErrorComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  back(): void {
    this.location.back();
  }
}
