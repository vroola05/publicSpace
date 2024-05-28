import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextFieldBigComponent } from './text-field-big.component';

describe('TextFieldBigComponent', () => {
  let component: TextFieldBigComponent;
  let fixture: ComponentFixture<TextFieldBigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TextFieldBigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
