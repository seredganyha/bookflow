import { Injectable, signal } from '@angular/core';
import { Book, BookId, BookWorkerCommand } from '../core/workers/book-worker/book.types';
import { map, Observable } from 'rxjs';
import { WorkerService } from '../core/workers/worker.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable()
export class BookService {
  private readonly books = signal<Book[]>([]);
  readonly books$ = toObservable(this.books)

  constructor(private workerService: WorkerService) {
    this.loadBooks()
  }
  
  async addBook(book: Book): Promise<Book> {
    try {

      const { payload } = await this.workerService
        .promiseRequest<Book>(
          {
            command: BookWorkerCommand.AddBook, 
            payload: book
          }
        )

      this.books.update((books) => [...books, book])

      return payload
    }
    catch (err) {
      console.log(err);
      throw new Error("Failed to add book")
    }
  }

  async loadBooks() {
    const res = await this.workerService.promiseRequest<Book[]>({command: BookWorkerCommand.GetBooks, payload: null})
    this.books.set(res.payload);
  }

  getBooks(): Observable<Book[]> {
    try {
      const res = this.workerService.request<Book[]>({command: BookWorkerCommand.GetBooks, payload: null})

      return res.pipe(map(res => res.payload))
    }
    catch (err) {
      throw new Error("Failed loading books")
    }
  }

  deleteBook(bookId: BookId): Observable<Book> {
    try {
      const res = this.workerService.request<Book>({command: BookWorkerCommand.DeleteBook, payload: bookId})

      return res.pipe(map(res => res.payload))
    }
    catch (err) {
      throw new Error("Failed to delete book");
    }
  }
}
