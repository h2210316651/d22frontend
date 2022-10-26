import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewDealComponent } from './admin-new-deal.component';

describe('AdminNewDealComponent', () => {
  let component: AdminNewDealComponent;
  let fixture: ComponentFixture<AdminNewDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewDealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
