import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextFieldPrefillComponent } from './text-field-prefill.component';

describe('TextFieldPrefillComponent', () => {
  let component: TextFieldPrefillComponent;
  let fixture: ComponentFixture<TextFieldPrefillComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFieldPrefillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldPrefillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
