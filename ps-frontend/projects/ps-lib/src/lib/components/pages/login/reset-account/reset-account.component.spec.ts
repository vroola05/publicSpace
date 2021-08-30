import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetAccountComponent } from './reset-account.component';

describe('ResetAccountComponent', () => {
  let component: ResetAccountComponent;
  let fixture: ComponentFixture<ResetAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
