import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSettingsGroupsComponent } from './panel-settings-groups.component';

describe('PanelSettingsGroupsComponent', () => {
  let component: PanelSettingsGroupsComponent;
  let fixture: ComponentFixture<PanelSettingsGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSettingsGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSettingsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
