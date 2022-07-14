import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSpecificationsConfirmationComponent } from './order-specifications-confirmation.component';

describe('OrderSpecificationsConfirmationComponent', () => {
  let component: OrderSpecificationsConfirmationComponent;
  let fixture: ComponentFixture<OrderSpecificationsConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSpecificationsConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSpecificationsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
