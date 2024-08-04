import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTestLayoutComponent } from './student-test-layout.component';

describe('StudentTestLayoutComponent', () => {
  let component: StudentTestLayoutComponent;
  let fixture: ComponentFixture<StudentTestLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentTestLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentTestLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
