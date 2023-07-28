import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

/*
  TODO:
  Add alertService
  Add routing on html. E.g. to "register" button
  Add validator conditional to "name"
  Fix/add routing to previous page after login() and register()
*/
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
      name: [''],
      // TODO: search for a conditional validator for name when singUp is true
      // name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  singUpChange() {
    if (this.singUp) {
      this.singUp = false;
    } else {
      this.singUp = true;
    }
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
