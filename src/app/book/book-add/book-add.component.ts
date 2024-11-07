import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Book } from '../../core/workers/book-worker/book.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookAddComponent {
  @Output() chooseBook = new EventEmitter<Book>();
  @ViewChild('dialog') 
  private dialog!: ElementRef
  
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      title: ['', Validators.required],
      author: [''],
      description: [''],
      img: [null, Validators.required],
      file: [null, Validators.required]
    })
  }

  closeModal(): void {
    this.dialog?.nativeElement.close();
  }

  openModal(): void {
    this.dialog?.nativeElement.showModal();
  }

  public done() {
    this.chooseBook.emit(this.form.value as Book);
  }
}
