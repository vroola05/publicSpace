import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderitemConfirmationComponent } from './orderitem-confirmation.component';

describe('OrderitemConfirmationComponent', () => {
  let component: OrderitemConfirmationComponent;
  let fixture: ComponentFixture<OrderitemConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderitemConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderitemConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
