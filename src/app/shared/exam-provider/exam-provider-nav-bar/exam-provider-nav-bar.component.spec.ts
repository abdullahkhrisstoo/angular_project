import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamProviderNavBarComponent } from './exam-provider-nav-bar.component';

describe('ExamProviderNavBarComponent', () => {
  let component: ExamProviderNavBarComponent;
  let fixture: ComponentFixture<ExamProviderNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamProviderNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamProviderNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
