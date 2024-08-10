import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraTestComponent } from './camera-test.component';

describe('CameraTestComponent', () => {
  let component: CameraTestComponent;
  let fixture: ComponentFixture<CameraTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CameraTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
