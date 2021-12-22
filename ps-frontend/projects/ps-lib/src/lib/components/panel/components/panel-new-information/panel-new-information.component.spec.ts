import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PanelNewInformationComponent } from './panel-new-information.component';

describe('PanelNewInformationComponent', () => {
  let component: PanelNewInformationComponent;
  let fixture: ComponentFixture<PanelNewInformationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelNewInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelNewInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
