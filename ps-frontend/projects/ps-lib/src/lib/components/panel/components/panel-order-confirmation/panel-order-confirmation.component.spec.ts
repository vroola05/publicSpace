import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOrderConfirmationComponent } from './panel-order-confirmation.component';

describe('PanelOrderConfirmationComponent', () => {
  let component: PanelOrderConfirmationComponent;
  let fixture: ComponentFixture<PanelOrderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelOrderConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
