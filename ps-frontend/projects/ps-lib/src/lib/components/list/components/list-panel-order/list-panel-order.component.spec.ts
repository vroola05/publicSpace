import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListPanelOrderComponent } from './list-panel-order.component';

describe('ListPanelOrderComponent', () => {
  let component: ListPanelOrderComponent;
  let fixture: ComponentFixture<ListPanelOrderComponent>;

  beforeEach(waitForAsync(() => {
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
