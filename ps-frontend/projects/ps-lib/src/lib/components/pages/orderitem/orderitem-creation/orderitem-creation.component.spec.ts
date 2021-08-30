import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderitemCreationComponent } from './orderitem-creation.component';

describe('OrderitemCreationComponent', () => {
  let component: OrderitemCreationComponent;
  let fixture: ComponentFixture<OrderitemCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderitemCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderitemCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
