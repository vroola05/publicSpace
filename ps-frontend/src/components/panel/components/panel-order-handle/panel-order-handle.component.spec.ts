import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOrderHandleComponent } from './panel-order-handle.component';

describe('PanelOrderHandleComponent', () => {
  let component: PanelOrderHandleComponent;
  let fixture: ComponentFixture<PanelOrderHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelOrderHandleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOrderHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
