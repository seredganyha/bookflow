declare module 'text-manager' {

  export class TextManager {
    // import() is used because the standard method cannot be used. View more details
    // at: https://github.com/microsoft/TypeScript/issues/55019
    // -__-  bruuh
    constructor(
      dom: Document, 
      queueNode: QueueNode,
      maxChar: number, 
      indexes: import('./tm-worker.types').TMIndexes
    )

    getText(): string;
    getIndexes(): import('./tm-worker.types').TMIndexes;
    setIndexes(indexes: import('./tm-worker.types').TMIndexes): void;
  }

  export class QueueNode {
    constructor() {}
  }
}
