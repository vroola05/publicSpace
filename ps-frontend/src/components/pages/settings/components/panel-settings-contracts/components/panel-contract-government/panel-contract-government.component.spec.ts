import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelContractGovernmentComponent } from './panel-contract-government.component';

describe('PanelContractGovernmentComponent', () => {
  let component: PanelContractGovernmentComponent;
  let fixture: ComponentFixture<PanelContractGovernmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelContractGovernmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelContractGovernmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
