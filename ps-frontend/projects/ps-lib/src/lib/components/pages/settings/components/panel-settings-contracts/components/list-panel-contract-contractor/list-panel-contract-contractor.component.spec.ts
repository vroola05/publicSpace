import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelContractContractorComponent } from './list-panel-contract-contractor.component';

describe('ListPanelContractContractorComponent', () => {
  let component: ListPanelContractContractorComponent;
  let fixture: ComponentFixture<ListPanelContractContractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanelContractContractorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelContractContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
