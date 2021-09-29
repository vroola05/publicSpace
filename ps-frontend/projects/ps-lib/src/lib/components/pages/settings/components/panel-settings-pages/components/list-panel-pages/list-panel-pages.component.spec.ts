import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelPagesComponent } from './list-panel-pages.component';

describe('ListPanelPagesComponent', () => {
  let component: ListPanelPagesComponent;
  let fixture: ComponentFixture<ListPanelPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanelPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
