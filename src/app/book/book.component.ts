import { Component, effect, inject } from '@angular/core';
import { BookService } from './book.service';
import { Book } from '../core/workers/book-worker/book.types';
import { BookAddComponent } from './book-add/book-add.component';
import { DialogsService } from '../core/services/dialogs.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  standalone: false,
})
export class BookComponent {
  private readonly bookService = inject(BookService)
  private readonly dialogService = inject(DialogsService)
  private readonly dialog = this.dialogService.add<void, Book>(BookAddComponent)
  books$ = this.bookService.books$;
  bookFile!: File;

  constructor() {
    effect(() => {
      const book = this.dialog.done()
      if(book) {
        this.addBook(book)
      }
    })
  }
  
  addBook(book: Book) {
    this.bookService.addBook(book);
  }

  showModal() {
    this.dialog.show()
  }

  load() {
    this.bookService.loadBooks()
  }
}