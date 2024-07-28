import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationBodyComponent } from './examination-body.component';

describe('ExaminationBodyComponent', () => {
  let component: ExaminationBodyComponent;
  let fixture: ComponentFixture<ExaminationBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExaminationBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
