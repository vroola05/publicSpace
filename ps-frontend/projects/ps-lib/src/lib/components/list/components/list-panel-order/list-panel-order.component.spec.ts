import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelOrderComponent } from './list-panel-order.component';

describe('ListPanelOrderComponent', () => {
  let component: ListPanelOrderComponent;
  let fixture: ComponentFixture<ListPanelOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPanelOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
