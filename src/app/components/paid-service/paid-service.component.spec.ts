import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidServiceComponent } from './paid-service.component';

describe('PaidServiceComponent', () => {
  let component: PaidServiceComponent;
  let fixture: ComponentFixture<PaidServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
