import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PanelNewContactComponent } from './panel-new-contact.component';

describe('PanelNewContactComponent', () => {
  let component: PanelNewContactComponent;
  let fixture: ComponentFixture<PanelNewContactComponent>;

  beforeEach(waitForAsync(() => {
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
