import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHoverComponent } from './user-hover.component';

describe('UserHoverComponent', () => {
  let component: UserHoverComponent;
  let fixture: ComponentFixture<UserHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
