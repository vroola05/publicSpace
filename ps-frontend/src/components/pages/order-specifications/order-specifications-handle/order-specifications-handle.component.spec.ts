import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSpecificationsHandleComponent } from './order-specifications-handle.component';

describe('OrderSpecificationsHandleComponent', () => {
  let component: OrderSpecificationsHandleComponent;
  let fixture: ComponentFixture<OrderSpecificationsHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSpecificationsHandleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSpecificationsHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
