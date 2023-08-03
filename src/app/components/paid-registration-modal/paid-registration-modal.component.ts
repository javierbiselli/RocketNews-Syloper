import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataHandlingService } from 'src/app/services/data-handling.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-paid-registration-modal',
  templateUrl: './paid-registration-modal.component.html',
  styleUrls: ['./paid-registration-modal.component.scss']
})
export class PaidRegistrationModalComponent implements OnInit {
  
  display$!: Observable<boolean>;

  form!: FormGroup;
  submitted = false;

  authenticated = this.authenticationService.user;
  
  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthService,
    private dataHandlingService: DataHandlingService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.display$ = this.modalService.watch();

    this.form = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      name: ['', Validators.required],
      date: ['', [Validators.required, 
        Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],
      code: ['', Validators.required],
    });
  }

  close() {
    this.form.controls['cardNumber'].reset();
    this.form.controls['name'].reset();
    this.form.controls['date'].reset();
    this.form.controls['code'].reset();
    this.submitted = false;
    this.modalService.close();
  }

  // FORM LOGIC

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    let subscription;

    if (this.form.invalid) {
      return;
    }
    
    if (this.authenticated != null) {
      subscription = this.authenticated.subscribe((data) => {
        this.dataHandlingService.makeUserPremium(data!.id);
        localStorage.setItem('currentUser', JSON.stringify(data));
        console.log('paid.registratio.modal submit()' + JSON.stringify(data));
      });
      subscription.unsubscribe();
      this.close();

      window.alert('Now you are Premium user!');
      this.router.navigate([""]);
    }
    return;
  }

}
