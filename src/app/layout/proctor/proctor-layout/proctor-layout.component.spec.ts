import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProctorLayoutComponent } from './proctor-layout.component';

describe('ProctorLayoutComponent', () => {
  let component: ProctorLayoutComponent;
  let fixture: ComponentFixture<ProctorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProctorLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProctorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
