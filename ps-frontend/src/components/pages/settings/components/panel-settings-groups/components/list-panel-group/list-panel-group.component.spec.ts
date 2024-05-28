import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelGroupComponent } from './list-panel-group.component';

describe('ListPanelGroupComponent', () => {
  let component: ListPanelGroupComponent;
  let fixture: ComponentFixture<ListPanelGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanelGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
