import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelContractSpecificationComponent } from './list-panel-contract-specification.component';

describe('ListPanelContractSpecificationComponent', () => {
  let component: ListPanelContractSpecificationComponent;
  let fixture: ComponentFixture<ListPanelContractSpecificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanelContractSpecificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelContractSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
