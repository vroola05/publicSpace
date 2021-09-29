import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSettingsDomainsComponent } from './panel-settings-domains.component';

describe('PanelSettingsDomainsComponent', () => {
  let component: PanelSettingsDomainsComponent;
  let fixture: ComponentFixture<PanelSettingsDomainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSettingsDomainsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSettingsDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
