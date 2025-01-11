import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private firebaseAuth = inject(Auth);

  registerUser(user: IUser) {
    return createUserWithEmailAndPassword(
      this.firebaseAuth,
      user.email,
      user.password
    ).then((userCredential) => {
      const userId = userCredential.user.uid;
      localStorage.setItem('userId', userId);
      return userCredential;
    });
  }

  logUserIn(user: IUser) {
    return signInWithEmailAndPassword(
      this.firebaseAuth,
      user.email,
      user.password
    ).then((userCredential) => {
      const userId = userCredential.user.uid;
      localStorage.setItem('userId', userId);
      return userCredential;
    });
  }

  logUserOut() {
    return this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('userId');
    });
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
