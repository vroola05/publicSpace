import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewConfirmationComponent } from './new-confirmation.component';

describe('NewConfirmationComponent', () => {
  let component: NewConfirmationComponent;
  let fixture: ComponentFixture<NewConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
