import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  standalone: true,
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() buttonText: string = '';
  @Input() disabled: boolean = false;
  @Input() severity: 'primary' | 'secondary' = 'primary';
  @Output() actionEvent = new EventEmitter<void>();

  actionItem() {
    this.actionEvent.emit();
  }
}
