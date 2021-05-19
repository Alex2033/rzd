import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-actual-residence',
  templateUrl: './actual-residence.component.html',
  styleUrls: ['./actual-residence.component.scss'],
})
export class ActualResidenceComponent implements OnInit {
  @Output() changeSingle: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() actualResidence: FormGroup;
  @Input() cities: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}
