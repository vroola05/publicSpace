import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelContractContractorComponent } from './panel-contract-contractor.component';

describe('PanelContractContractorComponent', () => {
  let component: PanelContractContractorComponent;
  let fixture: ComponentFixture<PanelContractContractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelContractContractorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelContractContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
