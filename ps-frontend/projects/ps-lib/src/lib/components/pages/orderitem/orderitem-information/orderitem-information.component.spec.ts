import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderitemInformationComponent } from './orderitem-information.component';

describe('OrderitemInformationComponent', () => {
  let component: OrderitemInformationComponent;
  let fixture: ComponentFixture<OrderitemInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderitemInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderitemInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
