import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FilterEqualsComponent} from './filter-equals.component';

describe('FilterEqualsComponent', () => {
  let component: FilterEqualsComponent;
  let fixture: ComponentFixture<FilterEqualsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterEqualsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterEqualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
