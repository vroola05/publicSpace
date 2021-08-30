import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPOrGComponent } from './assign-p-or-g.component';

describe('AssignPOrGComponent', () => {
  let component: AssignPOrGComponent;
  let fixture: ComponentFixture<AssignPOrGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPOrGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPOrGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
