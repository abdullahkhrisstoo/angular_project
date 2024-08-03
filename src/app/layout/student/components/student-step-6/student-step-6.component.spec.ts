import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStep6Component } from './student-step-6.component';

describe('StudentStep6Component', () => {
  let component: StudentStep6Component;
  let fixture: ComponentFixture<StudentStep6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentStep6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentStep6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
