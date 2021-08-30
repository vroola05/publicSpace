import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelCompanyComponent } from './list-panel-company.component';

describe('ListPanelCompanyComponent', () => {
  let component: ListPanelCompanyComponent;
  let fixture: ComponentFixture<ListPanelCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanelCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
