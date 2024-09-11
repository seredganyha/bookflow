import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {
  @Input() options: string[] | null = [];
  @Input() value: string | null = '';

  @Output() valueChange = new EventEmitter<string>();

  onValueChange(newValue: string): void {
    this.valueChange.emit(newValue);
  }
}
