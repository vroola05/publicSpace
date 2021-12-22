import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssignPAndGComponent } from './assign-p-and-g.component';

describe('AssignPAndGComponent', () => {
  let component: AssignPAndGComponent;
  let fixture: ComponentFixture<AssignPAndGComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPAndGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPAndGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
