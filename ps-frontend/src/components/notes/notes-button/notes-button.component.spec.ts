import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotesButtonComponent } from './notes-button.component';

describe('NotesButtonComponent', () => {
  let component: NotesButtonComponent;
  let fixture: ComponentFixture<NotesButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
