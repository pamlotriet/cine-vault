import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private firebaseAuth = inject(Auth);
  registerUser(user: IUser) {
    createUserWithEmailAndPassword(
      this.firebaseAuth,
      user.email,
      user.password
    );
  }
}
