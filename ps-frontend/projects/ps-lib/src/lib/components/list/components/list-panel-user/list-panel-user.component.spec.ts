import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPanelUserComponent } from './list-panel-user.component';

describe('ListPanelUserComponent', () => {
  let component: ListPanelUserComponent;
  let fixture: ComponentFixture<ListPanelUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPanelUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPanelUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
