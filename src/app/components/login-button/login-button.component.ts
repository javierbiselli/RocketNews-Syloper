import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  constructor(private authenticationService: AuthService,
  ) { }

  authenticated = this.authenticationService.user;
  // userValue = this.authenticationService.userValue;
  userValue: User | null | undefined;

  ngOnInit(): void {
    this.authenticated.subscribe(data => this.userValue = data);
  }

  onLogout() {
    this.authenticationService.logout();
    console.log('logged out');
    window.alert('Logged out.');
  }

}
