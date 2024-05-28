import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrderHandleComponent } from './order-handle.component';

describe('OrderHandleComponent', () => {
  let component: OrderHandleComponent;
  let fixture: ComponentFixture<OrderHandleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderHandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
