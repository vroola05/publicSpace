import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelChangeConfirmationComponent } from './panel-change-confirmation.component';

describe('PanelChangeConfirmationComponent', () => {
  let component: PanelChangeConfirmationComponent;
  let fixture: ComponentFixture<PanelChangeConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelChangeConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelChangeConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
