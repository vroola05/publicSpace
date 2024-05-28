import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderHandleNoLoginComponent } from './order-handle-no-login.component';

describe('OrderHandleNoLoginComponent', () => {
  let component: OrderHandleNoLoginComponent;
  let fixture: ComponentFixture<OrderHandleNoLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderHandleNoLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHandleNoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
