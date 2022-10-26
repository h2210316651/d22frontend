import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorNewProductComponent } from './vendor-new-product.component';

describe('VendorNewProductComponent', () => {
  let component: VendorNewProductComponent;
  let fixture: ComponentFixture<VendorNewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorNewProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
