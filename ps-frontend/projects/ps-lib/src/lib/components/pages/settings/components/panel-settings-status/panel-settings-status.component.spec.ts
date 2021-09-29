import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSettingsStatusComponent } from './panel-settings-status.component';

describe('PanelSettingsStatusComponent', () => {
  let component: PanelSettingsStatusComponent;
  let fixture: ComponentFixture<PanelSettingsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSettingsStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSettingsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
