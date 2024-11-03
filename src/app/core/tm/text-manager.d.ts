declare module 'text-manager' {

  export class TextManager {
    // import() is used because the standard method cannot be used. View more details
    // at: https://github.com/microsoft/TypeScript/issues/55019
    // -__-  bruuh
    constructor(
      maxChar?: number, 
      indexes?: import('./tm.types').TMIndexes
    )

    getText(): string;
    setFile(bookContent: string): void;
    getIndexes(): import('./tm.types').TMIndexes;
    setIndexes(indexes: import('./tm.types').TMIndexes): void;
  }

  export class QueueNode {
    constructor() {}
  }
}
