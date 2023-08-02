import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "@shared/models";
import { AuthService } from "src/app/services/auth.service";
import { ModalService } from "src/app/services/modal.service";

@Component({
  selector: "app-paid-service",
  templateUrl: "./paid-service.component.html",
  styleUrls: ["./paid-service.component.scss"],
})
export class PaidServiceComponent implements OnInit {

  constructor(
    private modalService: ModalService,
    private authenticationService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  authenticated = this.authenticationService.user;
  userValue: User | null | undefined;

  ngOnInit(): void {
    this.authenticated.subscribe((data) => (this.userValue = data));
  }

  open() {
    if (localStorage.getItem('currentUser') != null) {
      this.modalService.open();
      console.log('open called');
    } else {
      console.log('no user');
      this.router.navigateByUrl("login");
    }
  }
}
