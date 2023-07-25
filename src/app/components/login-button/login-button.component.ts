import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  constructor(private authenticationService: AuthService,
    // @Inject(DOCUMENT) public document: Document, //only if "returnTo" is neded
  ) { }

  authenticated = this.authenticationService.user;
  userValue = this.authenticationService.userValue;

  // authenticated = null;

  ngOnInit(): void {
  }

  onLogout() {
    this.authenticationService.logout();
    console.log('logged out');
  }

}
