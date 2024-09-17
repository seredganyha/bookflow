import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T> implements ControlValueAccessor {
  @Input()
  select: T | null = null;

  @Input()
  options: T[] | null = null;

  @Output() selectChange = new EventEmitter<T>();

  private onChange: (value: T) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: T | null): void {
    this.select = value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onValueChange(value: any): void {
    this.selectChange.emit(value);
    this.onChange(value);
  }

  trackByIndex(index: number): number {
    return index;
  }
}