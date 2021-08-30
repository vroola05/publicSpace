import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTabSelectorComponent } from './panel-tab-selector.component';

describe('PanelTabsComponent', () => {
  let component: PanelTabSelectorComponent;
  let fixture: ComponentFixture<PanelTabSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelTabSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTabSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
