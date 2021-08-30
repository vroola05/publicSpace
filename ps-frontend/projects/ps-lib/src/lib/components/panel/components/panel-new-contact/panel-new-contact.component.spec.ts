import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelNewContactComponent } from './panel-new-contact.component';

describe('PanelNewContactComponent', () => {
  let component: PanelNewContactComponent;
  let fixture: ComponentFixture<PanelNewContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelNewContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelNewContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
