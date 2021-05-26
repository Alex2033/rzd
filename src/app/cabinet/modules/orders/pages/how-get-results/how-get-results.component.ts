import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-get-results',
  templateUrl: './how-get-results.component.html',
  styleUrls: ['./how-get-results.component.scss'],
})
export class HowGetResultsComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }
}
