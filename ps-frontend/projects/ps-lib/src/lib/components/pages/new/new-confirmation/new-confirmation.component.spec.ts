import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConfirmationComponent } from './new-confirmation.component';

describe('NewConfirmationComponent', () => {
  let component: NewConfirmationComponent;
  let fixture: ComponentFixture<NewConfirmationComponent>;

  beforeEach(async(() => {
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
