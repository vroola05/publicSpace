import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PanelOrderInfoComponent } from './panel-order-info.component';

describe('PanelOrderInfoComponent', () => {
  let component: PanelOrderInfoComponent;
  let fixture: ComponentFixture<PanelOrderInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelOrderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
