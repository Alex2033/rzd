/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CityItemComponent } from './city-item.component';

describe('CityItemComponent', () => {
  let component: CityItemComponent;
  let fixture: ComponentFixture<CityItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
