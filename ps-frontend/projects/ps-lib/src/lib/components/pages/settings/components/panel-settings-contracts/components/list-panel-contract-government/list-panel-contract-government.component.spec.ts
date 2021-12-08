import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelContractGovernmentComponent } from './list-panel-contract-government.component';

describe('ListPanelContractGovernmentComponent', () => {
  let component: ListPanelContractGovernmentComponent;
  let fixture: ComponentFixture<ListPanelContractGovernmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanelContractGovernmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelContractGovernmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
