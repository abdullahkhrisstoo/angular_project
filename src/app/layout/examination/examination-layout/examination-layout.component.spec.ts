import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationLayoutComponent } from './examination-layout.component';

describe('ExaminationLayoutComponent', () => {
  let component: ExaminationLayoutComponent;
  let fixture: ComponentFixture<ExaminationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExaminationLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
