import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSettingsCategoryComponent } from './panel-settings-category.component';

describe('PanelSettingsCategoryComponent', () => {
  let component: PanelSettingsCategoryComponent;
  let fixture: ComponentFixture<PanelSettingsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSettingsCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSettingsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
