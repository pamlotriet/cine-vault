import { Component, inject, OnInit } from '@angular/core';
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
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  router = inject(Router);
  registrationForm!: FormGroup;
  isFormValid: boolean = false;
  authService = inject(AuthenticationService);

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.registrationForm.valueChanges.subscribe((value) => {
      console.log('Value changes detected:', value);
      console.log(this.registrationForm);
    });
  }

  createForm() {
    this.registrationForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        this.confirmPasswordValidator,
      ]),
    });
  }

  navigateToLogin() {
    this.router.navigateByUrl('login');
  }

  private confirmPasswordValidator(control: AbstractControl) {
    if (control.value == control.parent?.value.password) {
      return null;
    } else {
      return { invalidConfirmPassword: true };
    }
  }

  getControl(controlName: string): AbstractControl {
    return this.registrationForm.get(controlName) as AbstractControl;
  }

  onRegister() {
    if (this.registrationForm.valid) {
      this.authService
        .registerUser(this.registrationForm.value)
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          //TODO:add popup
          console.error('Registration failed:', error);
        });
    }
  }
}
