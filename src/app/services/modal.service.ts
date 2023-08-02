import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private display: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // private display: Boolean = false;

  watch(): Observable<boolean> {
    console.log('watch():' + this.display);
    return this.display.asObservable();

    // return this.display.asObservable();;
  }

  open() {
    this.display.next(true);
    // this.display = true;
    console.log('open():' + this.display);
  }

  close() {
    this.display.next(false);
    // this.display = false;
    console.log('close():' + this.display);

  }
}
