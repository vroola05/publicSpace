import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSettingsContractSpecificationsComponent } from './panel-settings-contract-specifications.component';

describe('PanelSettingsOrderSpecificationsComponent', () => {
  let component: PanelSettingsContractSpecificationsComponent;
  let fixture: ComponentFixture<PanelSettingsContractSpecificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSettingsContractSpecificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSettingsContractSpecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
