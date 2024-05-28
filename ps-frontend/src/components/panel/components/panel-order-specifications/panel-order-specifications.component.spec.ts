import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelOrderSpecificationsComponent } from './panel-order-specifications.component';

describe('PanelOrderSpecificationsComponent', () => {
  let component: PanelOrderSpecificationsComponent;
  let fixture: ComponentFixture<PanelOrderSpecificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelOrderSpecificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelOrderSpecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
