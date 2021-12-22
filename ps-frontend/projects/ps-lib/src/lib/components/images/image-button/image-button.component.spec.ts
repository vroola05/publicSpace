import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImageButtonComponent } from './image-button.component';

describe('ImageButtonComponent', () => {
  let component: ImageButtonComponent;
  let fixture: ComponentFixture<ImageButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
