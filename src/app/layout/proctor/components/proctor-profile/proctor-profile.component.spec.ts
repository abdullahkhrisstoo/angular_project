import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProctorProfileComponent } from './proctor-profile.component';

describe('ProctorProfileComponent', () => {
  let component: ProctorProfileComponent;
  let fixture: ComponentFixture<ProctorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProctorProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProctorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
