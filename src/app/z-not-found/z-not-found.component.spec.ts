import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZNotFoundComponent } from './z-not-found.component';

describe('ZNotFoundComponent', () => {
  let component: ZNotFoundComponent;
  let fixture: ComponentFixture<ZNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
