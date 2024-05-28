import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChangeConfirmationComponent } from './change-confirmation.component';

describe('ChangeConfirmationComponent', () => {
  let component: ChangeConfirmationComponent;
  let fixture: ComponentFixture<ChangeConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
