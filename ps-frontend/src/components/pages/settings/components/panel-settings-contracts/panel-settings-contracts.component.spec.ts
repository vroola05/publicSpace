import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSettingsContractsComponent } from './panel-settings-contracts.component';

describe('PanelSettingsContractsComponent', () => {
  let component: PanelSettingsContractsComponent;
  let fixture: ComponentFixture<PanelSettingsContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSettingsContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSettingsContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
