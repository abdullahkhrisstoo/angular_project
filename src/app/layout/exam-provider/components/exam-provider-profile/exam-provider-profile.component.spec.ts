import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamProviderProfileComponent } from './exam-provider-profile.component';

describe('ExamProviderProfileComponent', () => {
  let component: ExamProviderProfileComponent;
  let fixture: ComponentFixture<ExamProviderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamProviderProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamProviderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
