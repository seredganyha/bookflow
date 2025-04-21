import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'app-file-select',
  templateUrl: './file-select.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileSelectComponent implements ControlValueAccessor {
  @Input()
  file: File | null = null;

  @Output() fileChange = new EventEmitter<File>();

  constructor(private cdr: ChangeDetectorRef) {}

  private onChange: (value: File) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: File | null): void {
    this.file = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: File) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.file = file;
      this.fileChange.emit(file);
      this.onChange(file);
      this.onTouched();
    }
  }
}

