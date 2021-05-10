import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-adult',
  templateUrl: './choose-adult.component.html',
  styleUrls: ['./choose-adult.component.scss'],
})
export class ChooseAdultComponent implements OnInit {
  public selectedAdult: string;
  public adults: string[] = ['Victoria', 'Ivan'];

  constructor() {}

  ngOnInit(): void {}
}
