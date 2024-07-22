import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopexamComponent } from './topexam.component';

describe('TopexamComponent', () => {
  let component: TopexamComponent;
  let fixture: ComponentFixture<TopexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopexamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
