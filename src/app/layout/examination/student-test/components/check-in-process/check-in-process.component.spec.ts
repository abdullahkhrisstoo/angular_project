import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInProcessComponent } from './check-in-process.component';

describe('CheckInProcessComponent', () => {
  let component: CheckInProcessComponent;
  let fixture: ComponentFixture<CheckInProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckInProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
