import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { IUser } from '../models/user.model';
import { signInWithEmailAndPassword } from 'firebase/auth';

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
    );
  }

  logUserIn(user: IUser) {
    return signInWithEmailAndPassword(
      this.firebaseAuth,
      user.email,
      user.password
    );
  }
}
