import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConditionsComponent } from './create-conditions.component';

describe('CreateConditionsComponent', () => {
  let component: CreateConditionsComponent;
  let fixture: ComponentFixture<CreateConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
