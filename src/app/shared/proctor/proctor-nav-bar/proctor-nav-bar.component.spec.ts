import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProctorNavBarComponent } from './proctor-nav-bar.component';

describe('ProctorNavBarComponent', () => {
  let component: ProctorNavBarComponent;
  let fixture: ComponentFixture<ProctorNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProctorNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProctorNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
