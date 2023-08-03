import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidRegistrationModalComponent } from './paid-registration-modal.component';

describe('PaidRegistrationModalComponent', () => {
  let component: PaidRegistrationModalComponent;
  let fixture: ComponentFixture<PaidRegistrationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidRegistrationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidRegistrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
