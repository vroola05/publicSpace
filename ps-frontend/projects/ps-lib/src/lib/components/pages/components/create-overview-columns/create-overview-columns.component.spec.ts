import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOverviewColumnsComponent } from './create-overview-columns.component';

describe('CreateOverviewColumnsComponent', () => {
  let component: CreateOverviewColumnsComponent;
  let fixture: ComponentFixture<CreateOverviewColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOverviewColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOverviewColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
