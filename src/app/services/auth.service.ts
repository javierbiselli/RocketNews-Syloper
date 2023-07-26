import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataHandlingService } from './data-handling.service';
import { User } from '@shared/models';
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User |null>;
  
  constructor(
    private dataHandlingService: DataHandlingService,
    // private http: HttpClient,
    private router: Router,
  ) {
    this.userSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.user = this.userSubject.asObservable(); // Ver si se usa en algun lado
  }

  public get userValue(): User | null{
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    let userObservable: BehaviorSubject<User | null>;

    // Search user
    let user = this.dataHandlingService.users.getValue()
                .find(x => x.email === email && x.password === password);
                // .find(({email}) => email === email);

    userObservable = new BehaviorSubject<User | null>(user || null);
    return userObservable.asObservable()
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(JSON.parse('null'));
    this.router.navigate(['/']);
  }

  register(name: string, email: string, password: string) {
    // TODO: add id counter
    // TODO: add user already exist

    let newId: string = this.dataHandlingService.users.getValue().length.toString();
    let user: User = {id: newId, name: name, email: email, password: password, isPremium: false};
    this.dataHandlingService.pushUser(user);
  }
}
