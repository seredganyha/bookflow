/// <reference lib="webworker" />

import { getFirstWords } from "../../../shared/utils/utils";
import { Fragment, FragmentContent, FragmentInfo } from "../../../types/fragment";
import { control, worker } from "../base";
import { IndexesDB } from "../../idb/indexes-db";
import { TM } from "../../tm/tm";
import { BookId, BookWorkerCommand, CreateBook } from "./book.types";
import { DB_CONFIG } from "./db.config";

const TITLE_WORDS: number = 5;

@worker
export default class BookWorker {
  private readonly dbBook: IndexesDB<CreateBook>;
  private readonly dbFragment: IndexesDB<FragmentInfo>;
  private readonly bookLoaded: Promise<void>;
  private readonly tmMap = new Map<BookId, TM>();

  constructor() {
    this.dbBook = new IndexesDB(DB_CONFIG.books.dbName, DB_CONFIG.books.storeName);
    this.dbFragment = new IndexesDB(
      DB_CONFIG.fragments.dbName, 
      DB_CONFIG.fragments.storeName,
      DB_CONFIG.fragments.indexes
    )

    this.bookLoaded = this.initTmWorkers();
  }

  async initTmWorkers() {
    const books = await this.getBooks()

    books.forEach(book => {
      const tm = new TM();

      this.tmMap.set(book.id, tm);
      tm.setBook(book.file)
    })
  }

  @control(BookWorkerCommand.AddBook)
  async addBook(book: CreateBook) {
    this.dbBook.add(book);
  }

  @control(BookWorkerCommand.GetBooks)
  async getBooks() {
    const books = await this.dbBook.getAll();
    return books
  }

  @control(BookWorkerCommand.DeleteBook)
  deleteBook(bookId: BookId) {
    this.dbBook.delete(bookId);
  }

  async addFragment(fragment: FragmentInfo) {
    return await this.dbFragment.add(fragment);
  }

  @control(BookWorkerCommand.GetFragment)
  async getFragment(bookId: BookId): Promise<Fragment> {
    await this.bookLoaded;

    if(this.tmMap.has(bookId)) {
      try {
        const tm = this.tmMap.get(bookId) as TM;
        const fragmentContent: FragmentContent = await tm.getFragment();

        const fragmentInfo: FragmentInfo = {
          title: getFirstWords(fragmentContent, TITLE_WORDS),
          createdAt: Date.now(),
          content: fragmentContent,
          bookId,
          isReaded: false
        }

        const fragment = await this.dbFragment.add(fragmentInfo)

        return fragment
      }
      catch(e) {
        throw e;
      }
    }
    else {
      throw new Error("Book not found")
    }
  }

  @control(BookWorkerCommand.GetAllFragments)
  async getFragments(bookId: BookId): Promise<Fragment[]> {
    await this.bookLoaded;

    if(this.tmMap.has(bookId)) {
      try {
        const fragments = await this.dbFragment.getByIndex('bookId', bookId)

        return fragments;
      }
      catch(e) {
        throw e;
      }
    }
    else {
      throw new Error("Book not found");
    }
  }
}

const bookWorker = new BookWorker();