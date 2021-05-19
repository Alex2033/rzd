import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-address',
  templateUrl: './register-address.component.html',
  styleUrls: ['./register-address.component.scss'],
})
export class RegisterAddressComponent implements OnInit {
  @Input() registerAddress: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
