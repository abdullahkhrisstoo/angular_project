import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrophoneTestComponent } from './microphone-test.component';

describe('MicrophoneTestComponent', () => {
  let component: MicrophoneTestComponent;
  let fixture: ComponentFixture<MicrophoneTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicrophoneTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicrophoneTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
