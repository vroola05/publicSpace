import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSettingsCompaniesComponent } from './panel-settings-companies.component';

describe('PanelSettingsCompaniesComponent', () => {
  let component: PanelSettingsCompaniesComponent;
  let fixture: ComponentFixture<PanelSettingsCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSettingsCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSettingsCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
