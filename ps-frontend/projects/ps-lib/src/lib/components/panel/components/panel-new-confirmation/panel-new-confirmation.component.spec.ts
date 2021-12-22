import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PanelNewConfirmationComponent } from './panel-new-confirmation.component';

describe('PanelNewConfirmationComponent', () => {
  let component: PanelNewConfirmationComponent;
  let fixture: ComponentFixture<PanelNewConfirmationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelNewConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelNewConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
