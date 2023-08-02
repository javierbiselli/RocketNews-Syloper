import { Component, OnInit } from "@angular/core";
import { ModalService } from "src/app/services/modal.service";

@Component({
  selector: "app-paid-service",
  templateUrl: "./paid-service.component.html",
  styleUrls: ["./paid-service.component.scss"],
})
export class PaidServiceComponent implements OnInit {

  constructor(
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {}

  open() {
    this.modalService.open();
    console.log('open called');
  }
}
