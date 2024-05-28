import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BtnContainedComponent } from './btn-contained.component';

describe('BtnContainedComponent', () => {
  let component: BtnContainedComponent;
  let fixture: ComponentFixture<BtnContainedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnContainedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnContainedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
