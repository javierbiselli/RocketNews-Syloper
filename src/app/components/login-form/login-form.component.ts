import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  singUp = false;
  valid = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthService
  ) {}
    
  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', ],
      email: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  /**
   * Change form config to login or register
   */
  singUpChange() {
    this.submitted = false;
    
    this.singUp = !this.singUp;

    // Change validators depending on whether the form is loggin or register
    if (this.singUp) {
      this.form.controls['name'].setValidators([Validators.required]);
      this.form.controls['password'].setValue('');
      this.form.controls['password'].setValidators([Validators.required, Validators.minLength(6)]);
    } else {
      this.form.controls['name'].clearValidators();
      this.form.controls['password'].setValue('');
      this.form.controls['password'].setValidators([Validators.required]);
    }
    this.form.updateValueAndValidity();
  }

  onSubmit() {
    if (!this.singUp) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    this.submitted = true;
    this.valid = true;

    if (this.form.invalid) {
      console.log('invalid form')
      return;
    }

    try {
      this.authenticationService.login(this.f['email'].value, this.f['password'].value);
    } catch (error) {
      this.valid = false;
      console.error(error);
      return;
    }
    
    localStorage.removeItem('showPublicity');

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigateByUrl(returnUrl);
  }

  register() {
    this.submitted = true;

    if (this.form.invalid) {
      console.log('invalid form')
      return;
    }

    this.authenticationService.register(this.f['name'].value, this.f['email'].value, this.f['password'].value)
    
    window.alert('Register succefull!');

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigateByUrl(returnUrl);
    
    this.login();
  }
}
