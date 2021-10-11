import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelActionComponent } from './list-panel-action.component';

describe('ListPanelActionComponent', () => {
  let component: ListPanelActionComponent;
  let fixture: ComponentFixture<ListPanelActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanelActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
