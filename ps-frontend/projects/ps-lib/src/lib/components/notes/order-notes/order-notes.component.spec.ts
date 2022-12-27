import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNotesComponent } from './order-notes.component';

describe('OrderNotesComponent', () => {
  let component: OrderNotesComponent;
  let fixture: ComponentFixture<OrderNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
