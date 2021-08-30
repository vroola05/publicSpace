import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFieldComponent } from './dropdown-field.component';

describe('DropdownFieldComponent', () => {
  let component: DropdownFieldComponent;
  let fixture: ComponentFixture<DropdownFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
