import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAssignGAndUComponent } from './panel-assign-g-and-u.component';

describe('PanelAssignGAndUComponent', () => {
  let component: PanelAssignGAndUComponent;
  let fixture: ComponentFixture<PanelAssignGAndUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelAssignGAndUComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAssignGAndUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
