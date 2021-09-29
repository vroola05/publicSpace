import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSettingsActionsComponent } from './panel-settings-actions.component';

describe('PanelSettingsActionsComponent', () => {
  let component: PanelSettingsActionsComponent;
  let fixture: ComponentFixture<PanelSettingsActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSettingsActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSettingsActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
