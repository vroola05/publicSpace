import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelStatusComponent } from './list-panel-status.component';

describe('ListPanelStatusComponent', () => {
  let component: ListPanelStatusComponent;
  let fixture: ComponentFixture<ListPanelStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanelStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
