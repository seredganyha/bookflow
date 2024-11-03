import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-select',
  standalone: true,
  imports: [],
  templateUrl: './file-select.component.html',
  styleUrl: './file-select.component.scss'
})
export class FileSelectComponent {
  @Input() file!: File | undefined;
  @Output() fileChange = new EventEmitter();

  onChange(file: File | undefined) {
    this.fileChange.emit(file)
  }
}
