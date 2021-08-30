import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSettingsMainCategoryComponent } from './panel-settings-main-category.component';

describe('PanelSettingsMainCategoryComponent', () => {
  let component: PanelSettingsMainCategoryComponent;
  let fixture: ComponentFixture<PanelSettingsMainCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelSettingsMainCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelSettingsMainCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
