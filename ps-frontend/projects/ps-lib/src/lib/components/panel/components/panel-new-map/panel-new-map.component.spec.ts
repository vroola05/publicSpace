import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelNewMapComponent } from './panel-new-map.component';

describe('PanelNewMapComponent', () => {
  let component: PanelNewMapComponent;
  let fixture: ComponentFixture<PanelNewMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelNewMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelNewMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
