import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAssetsComponent } from './home-assets.component';

describe('HomeAssetsComponent', () => {
  let component: HomeAssetsComponent;
  let fixture: ComponentFixture<HomeAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeAssetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
