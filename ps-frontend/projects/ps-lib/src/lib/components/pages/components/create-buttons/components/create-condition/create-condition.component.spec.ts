import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConditionComponent } from './create-condition.component';

describe('CreateConditionComponent', () => {
  let component: CreateConditionComponent;
  let fixture: ComponentFixture<CreateConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateConditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
