import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartAndTableComponent } from './chart-and-table.component';

describe('ChartAndTableComponent', () => {
  let component: ChartAndTableComponent;
  let fixture: ComponentFixture<ChartAndTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartAndTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartAndTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
