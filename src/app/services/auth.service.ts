import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataHandlingService } from './data-handling.service';
import { User } from '@shared/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User |null>;
  
  constructor(
    private dataHandlingService: DataHandlingService,
    private router: Router,
  ) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User | null{
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    let user = this.dataHandlingService.users.getValue()
                .find(x => x.email === email && x.password === password);

    if (!user) {
      throw new Error("Username or password is incorrect");
    }
    console.log('setting localStorage...')
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(JSON.parse('null'));
    this.router.navigate(['/']);
  }

  register(name: string, email: string, password: string) {
    let newId: string = this.dataHandlingService.users.getValue().length.toString();
    let user: User = {id: newId, name: name, email: email, password: password, isPremium: false};
    this.dataHandlingService.pushUser(user);
  }
}
