import { Component, inject } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  router = inject(Router);
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  navigateToRegister() {
    this.router.navigateByUrl('register');
  }

  getControl(controlName: string): AbstractControl {
    return this.loginForm.get(controlName) as AbstractControl;
  }
}
