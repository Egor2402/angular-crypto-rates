import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean;

  constructor() {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  logIn(userName: string, password: string): Observable<void> {
    return new Observable(subscriber => {
      if (userName === 'test' && password === '12345') {
        localStorage.setItem('isAuthenticated', 'true');
        this.isAuthenticated = true;
        subscriber.next();
        subscriber.complete();
      } else {
        subscriber.error();
      }
    });
  }

  logOut(): Observable<void> {
    return new Observable(subscriber => {
      localStorage.removeItem('isAuthenticated');
      this.isAuthenticated = false;
      subscriber.next();
      subscriber.complete();
    });
  }
}
