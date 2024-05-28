import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSpecificationsSelectComponent } from './order-specifications-select.component';

describe('OrderSpecificationsSelectComponent', () => {
  let component: OrderSpecificationsSelectComponent;
  let fixture: ComponentFixture<OrderSpecificationsSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSpecificationsSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSpecificationsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
