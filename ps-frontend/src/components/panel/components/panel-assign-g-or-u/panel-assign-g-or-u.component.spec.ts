import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAssignGOrUComponent } from './panel-assign-g-or-u.component';

describe('PanelAssignGOrUComponent', () => {
  let component: PanelAssignGOrUComponent;
  let fixture: ComponentFixture<PanelAssignGOrUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelAssignGOrUComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAssignGOrUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
