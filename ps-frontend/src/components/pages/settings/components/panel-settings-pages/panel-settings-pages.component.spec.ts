import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSettingsPagesComponent } from './panel-settings-pages.component';

describe('PanelSettingsPagesComponent', () => {
  let component: PanelSettingsPagesComponent;
  let fixture: ComponentFixture<PanelSettingsPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSettingsPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSettingsPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
