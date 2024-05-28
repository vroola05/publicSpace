import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOverviewColumnComponent } from './create-overview-column.component';

describe('CreateOverviewColumnComponent', () => {
  let component: CreateOverviewColumnComponent;
  let fixture: ComponentFixture<CreateOverviewColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOverviewColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOverviewColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
