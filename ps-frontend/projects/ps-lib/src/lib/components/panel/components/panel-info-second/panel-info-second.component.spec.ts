import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelInfoSecondComponent } from './panel-info-second.component';

describe('PanelInfoSecondComponent', () => {
  let component: PanelInfoSecondComponent;
  let fixture: ComponentFixture<PanelInfoSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelInfoSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelInfoSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
