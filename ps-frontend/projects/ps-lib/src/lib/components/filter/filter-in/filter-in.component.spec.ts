import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterInComponent} from './filter-in.component';

describe('FilterInComponent', () => {
  let component: FilterInComponent;
  let fixture: ComponentFixture<FilterInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterInComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
