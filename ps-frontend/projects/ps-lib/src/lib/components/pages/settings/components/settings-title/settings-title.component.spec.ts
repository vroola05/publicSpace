import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTitleComponent } from './settings-title.component';

describe('SettingsTitleComponent', () => {
  let component: SettingsTitleComponent;
  let fixture: ComponentFixture<SettingsTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
