import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PanelOrderSecondComponent } from './panel-order-second.component';

describe('PanelOrderSecondComponent', () => {
  let component: PanelOrderSecondComponent;
  let fixture: ComponentFixture<PanelOrderSecondComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelOrderSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOrderSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
