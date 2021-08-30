import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInformationComponent } from './new-information.component';

describe('NewInformationComponent', () => {
  let component: NewInformationComponent;
  let fixture: ComponentFixture<NewInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
