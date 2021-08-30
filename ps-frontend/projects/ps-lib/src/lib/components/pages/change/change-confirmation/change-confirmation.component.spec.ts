import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeConfirmationComponent } from './change-confirmation.component';

describe('ChangeConfirmationComponent', () => {
  let component: ChangeConfirmationComponent;
  let fixture: ComponentFixture<ChangeConfirmationComponent>;

  beforeEach(async(() => {
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
