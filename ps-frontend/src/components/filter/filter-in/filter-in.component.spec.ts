import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {FilterInComponent} from './filter-in.component';

describe('FilterInComponent', () => {
  let component: FilterInComponent;
  let fixture: ComponentFixture<FilterInComponent>;

  beforeEach(waitForAsync(() => {
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
