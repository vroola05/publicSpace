import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelPagesOverviewComponent } from './list-panel-pages-overview.component';

describe('ListPanelPagesOverviewComponent', () => {
  let component: ListPanelPagesOverviewComponent;
  let fixture: ComponentFixture<ListPanelPagesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanelPagesOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelPagesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
