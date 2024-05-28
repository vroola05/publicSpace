import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOrderSelectComponent } from './panel-order-select.component';

describe('PanelOrderSelectComponent', () => {
  let component: PanelOrderSelectComponent;
  let fixture: ComponentFixture<PanelOrderSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelOrderSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOrderSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
