import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelContractSpecificationItemComponent } from './panel-contract-specification-item.component';

describe('PanelContractSpecificationItemComponent', () => {
  let component: PanelContractSpecificationItemComponent;
  let fixture: ComponentFixture<PanelContractSpecificationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelContractSpecificationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelContractSpecificationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
