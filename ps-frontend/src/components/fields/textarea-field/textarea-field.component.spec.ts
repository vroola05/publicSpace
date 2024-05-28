import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextareaFieldComponent } from './textarea-field.component';

describe('TextareaFieldComponent', () => {
  let component: TextareaFieldComponent;
  let fixture: ComponentFixture<TextareaFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
