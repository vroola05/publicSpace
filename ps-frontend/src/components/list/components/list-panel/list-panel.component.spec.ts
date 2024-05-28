import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListPanelComponent } from './list-panel.component';

describe('ListPanelComponent', () => {
  let component: ListPanelComponent;
  let fixture: ComponentFixture<ListPanelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
