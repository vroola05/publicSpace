import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelCategoryComponent } from './list-panel-category.component';

describe('ListPanelCategoryComponent', () => {
  let component: ListPanelCategoryComponent;
  let fixture: ComponentFixture<ListPanelCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanelCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
