import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockingScreenComponent } from './blocking-screen.component';

describe('BlockingScreenComponent', () => {
  let component: BlockingScreenComponent;
  let fixture: ComponentFixture<BlockingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockingScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
