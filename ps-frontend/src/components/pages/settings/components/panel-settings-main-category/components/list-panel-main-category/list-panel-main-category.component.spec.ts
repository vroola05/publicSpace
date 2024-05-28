import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelMainCategoryComponent } from './list-panel-main-category.component';

describe('ListPanelMainCategoryComponent', () => {
  let component: ListPanelMainCategoryComponent;
  let fixture: ComponentFixture<ListPanelMainCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanelMainCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelMainCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
