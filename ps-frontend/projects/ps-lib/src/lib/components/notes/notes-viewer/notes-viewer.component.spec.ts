import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesViewerComponent } from './notes-viewer.component';

describe('NotesViewerComponent', () => {
  let component: NotesViewerComponent;
  let fixture: ComponentFixture<NotesViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
