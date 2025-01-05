import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [InputTextModule, FloatLabel, ReactiveFormsModule, PasswordModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() labelText: string = '';
  @Input() isPassword: boolean = false;
  @Input() feedback: boolean = false;
}
