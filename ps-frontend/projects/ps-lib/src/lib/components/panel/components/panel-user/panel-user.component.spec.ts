import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PanelUserComponent } from './panel-user.component';

describe('PanelUserComponent', () => {
  let component: PanelUserComponent;
  let fixture: ComponentFixture<PanelUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
