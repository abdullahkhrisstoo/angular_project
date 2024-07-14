import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProctorSideBarComponent } from './proctor-side-bar.component';

describe('ProctorSideBarComponent', () => {
  let component: ProctorSideBarComponent;
  let fixture: ComponentFixture<ProctorSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProctorSideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProctorSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
