import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOrderInfoComponent } from './panel-order-info.component';

describe('PanelOrderInfoComponent', () => {
  let component: PanelOrderInfoComponent;
  let fixture: ComponentFixture<PanelOrderInfoComponent>;

  beforeEach(async(() => {
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
