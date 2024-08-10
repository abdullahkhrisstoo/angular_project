import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanInvoiceComponent } from './plan-invoice.component';

describe('PlanInvoiceComponent', () => {
  let component: PlanInvoiceComponent;
  let fixture: ComponentFixture<PlanInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
