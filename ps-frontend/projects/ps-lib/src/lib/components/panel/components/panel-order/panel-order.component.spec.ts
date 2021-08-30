import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOrderComponent } from './panel-order.component';

describe('PanelOrderComponent', () => {
  let component: PanelOrderComponent;
  let fixture: ComponentFixture<PanelOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
