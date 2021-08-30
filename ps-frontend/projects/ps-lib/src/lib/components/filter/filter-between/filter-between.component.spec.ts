import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBetweenComponent } from './filter-between.component';

describe('FilterDateComponent', () => {
  let component: FilterBetweenComponent;
  let fixture: ComponentFixture<FilterBetweenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterBetweenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBetweenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
