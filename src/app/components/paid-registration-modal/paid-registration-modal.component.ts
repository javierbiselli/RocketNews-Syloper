import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-paid-registration-modal',
  templateUrl: './paid-registration-modal.component.html',
  styleUrls: ['./paid-registration-modal.component.scss']
})
export class PaidRegistrationModalComponent implements OnInit {
  
  display$!: Observable<boolean>;
  
  constructor(
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.display$ = this.modalService.watch();
  }

  close() {
    this.modalService.close();
  }

}
