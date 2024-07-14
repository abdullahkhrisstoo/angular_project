import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamProviderSideBarComponent } from './exam-provider-side-bar.component';

describe('ExamProviderSideBarComponent', () => {
  let component: ExamProviderSideBarComponent;
  let fixture: ComponentFixture<ExamProviderSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExamProviderSideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamProviderSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
