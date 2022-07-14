import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSettingsOrderSpecificationsComponent } from './panel-settings-order-specifications.component';

describe('PanelSettingsOrderSpecificationsComponent', () => {
  let component: PanelSettingsOrderSpecificationsComponent;
  let fixture: ComponentFixture<PanelSettingsOrderSpecificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSettingsOrderSpecificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSettingsOrderSpecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
