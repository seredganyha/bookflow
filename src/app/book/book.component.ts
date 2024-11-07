import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { BookService } from './book.service';
import { Book } from '../core/workers/book-worker/book.types';
import { BookAddComponent } from './book-add/book-add.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  bookFile!: File;
  books$ = this.bookService.books$;
  isShowModal: boolean = false;
  @ViewChild(BookAddComponent) bookAddComponent!: BookAddComponent;

  constructor(private bookService: BookService, private cdr: ChangeDetectorRef) {}

  closeModal() {
    this.bookAddComponent.closeModal()
  }

  showModal() {
    this.bookAddComponent.openModal()
  }

  addBook(book: Book) {
    this.bookService.addBook(book);
  }

  load() {
    this.bookService.loadBooks()
  }
}