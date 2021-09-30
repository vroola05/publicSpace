import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPageOverviewComponent } from './panel-page-overview.component';

describe('PanelPageOverviewComponent', () => {
  let component: PanelPageOverviewComponent;
  let fixture: ComponentFixture<PanelPageOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelPageOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPageOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
