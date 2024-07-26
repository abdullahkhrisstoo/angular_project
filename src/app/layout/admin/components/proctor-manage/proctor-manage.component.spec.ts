import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProctorManageComponent } from './proctor-manage.component';

describe('ProctorManageComponent', () => {
  let component: ProctorManageComponent;
  let fixture: ComponentFixture<ProctorManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProctorManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProctorManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
