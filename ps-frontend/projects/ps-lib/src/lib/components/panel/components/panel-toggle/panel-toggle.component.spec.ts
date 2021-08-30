import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelToggleComponent } from './panel-toggle.component';

describe('PanelToggleComponent', () => {
  let component: PanelToggleComponent;
  let fixture: ComponentFixture<PanelToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
