import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbardAssetsComponent } from './dashbard-assets.component';

describe('DashbardAssetsComponent', () => {
  let component: DashbardAssetsComponent;
  let fixture: ComponentFixture<DashbardAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashbardAssetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbardAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
