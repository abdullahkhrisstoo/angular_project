import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProctorWorkTimeComponent } from './proctor-work-time.component';

describe('ProctorWorkTimeComponent', () => {
  let component: ProctorWorkTimeComponent;
  let fixture: ComponentFixture<ProctorWorkTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProctorWorkTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProctorWorkTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
