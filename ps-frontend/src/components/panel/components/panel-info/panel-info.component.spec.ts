import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PanelInfoComponent } from './panel-info.component';

describe('PanelInfoComponent', () => {
  let component: PanelInfoComponent;
  let fixture: ComponentFixture<PanelInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
