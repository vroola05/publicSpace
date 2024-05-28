import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSettingsComponent } from './panel-settings.component';

describe('PanelSettingsComponent', () => {
  let component: PanelSettingsComponent;
  let fixture: ComponentFixture<PanelSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
