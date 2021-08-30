import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldBigComponent } from './text-field-big.component';

describe('TextFieldBigComponent', () => {
  let component: TextFieldBigComponent;
  let fixture: ComponentFixture<TextFieldBigComponent>;

  beforeEach(async(() => {
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
