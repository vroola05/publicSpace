import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOrderComponent } from './details-order.component';

describe('DetailsOrderComponent', () => {
  let component: DetailsOrderComponent;
  let fixture: ComponentFixture<DetailsOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
