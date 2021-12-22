import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderGroupsComponent } from './header-groups.component';

describe('HeaderGroupsComponent', () => {
  let component: HeaderGroupsComponent;
  let fixture: ComponentFixture<HeaderGroupsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
