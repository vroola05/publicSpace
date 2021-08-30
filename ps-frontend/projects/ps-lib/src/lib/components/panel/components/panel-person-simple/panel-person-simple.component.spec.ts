import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPersonSimpleComponent } from './panel-person-simple.component';

describe('PanelPersonSimpleComponent', () => {
  let component: PanelPersonSimpleComponent;
  let fixture: ComponentFixture<PanelPersonSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelPersonSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPersonSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
