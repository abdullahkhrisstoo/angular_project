import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProctorReservationComponent } from './proctor-reservation.component';

describe('ProctorReservationComponent', () => {
  let component: ProctorReservationComponent;
  let fixture: ComponentFixture<ProctorReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProctorReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProctorReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
