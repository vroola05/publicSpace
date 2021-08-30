import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsStartComponent } from './settings-start.component';

describe('SettingsStartComponent', () => {
  let component: SettingsStartComponent;
  let fixture: ComponentFixture<SettingsStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
