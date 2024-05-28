import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeLocationComponent } from './change-location.component';

describe('ChangeLocationComponent', () => {
  let component: ChangeLocationComponent;
  let fixture: ComponentFixture<ChangeLocationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
