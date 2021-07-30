import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info-corporate-clients',
  templateUrl: './info-corporate-clients.component.html',
  styleUrls: ['./info-corporate-clients.component.scss'],
})
export class InfoCorporateClientsComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }
}
