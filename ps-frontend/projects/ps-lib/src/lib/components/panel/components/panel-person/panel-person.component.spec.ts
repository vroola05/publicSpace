import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPersonComponent } from './panel-person.component';

describe('PanelPersonComponent', () => {
  let component: PanelPersonComponent;
  let fixture: ComponentFixture<PanelPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
