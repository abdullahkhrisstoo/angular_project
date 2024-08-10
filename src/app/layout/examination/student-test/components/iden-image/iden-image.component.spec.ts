import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdenImageComponent } from './iden-image.component';

describe('IdenImageComponent', () => {
  let component: IdenImageComponent;
  let fixture: ComponentFixture<IdenImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IdenImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdenImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
