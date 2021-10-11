import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelDomainComponent } from './list-panel-domain.component';

describe('ListPanelDomainComponent', () => {
  let component: ListPanelDomainComponent;
  let fixture: ComponentFixture<ListPanelDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanelDomainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
