import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSettingsUsersComponent } from './panel-settings-users.component';

describe('PanelSettingsUsersComponent', () => {
  let component: PanelSettingsUsersComponent;
  let fixture: ComponentFixture<PanelSettingsUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelSettingsUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSettingsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
