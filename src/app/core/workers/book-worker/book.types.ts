export const enum BookWorkerCommand {
  AddBook = 'addBook',
  DeleteBook = 'deleteBook',
  GetBooks = 'getBooks',
  GetFragment = 'getFragment',
  GetAllFragments = 'getAllFragments',
}

export type BookId = number;

export type BookType = BookInfo | BookFile | Book;

export interface BookInfo {
  author: string;
  title: string;
  description: string;
  img: File;
}

export interface BookFile {
  file: File;
}

export interface CreateBook extends BookInfo, BookFile {}

export interface Book extends CreateBook {
  id: BookId;
}