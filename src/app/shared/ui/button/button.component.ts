import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'button[appButton]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type: 'primary' | 'secondary' = 'primary';

  @HostBinding('class.primary') get isPrimary() {
    return this.type === 'primary';
  }

  @HostBinding('class.secondary') get isSecondary() {
    return this.type === 'secondary';
  }
}
