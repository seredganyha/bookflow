export enum TMWorkerCommands {
  GetIndexes = 'getIndexes',
  SetIndexes = 'setIndexes',
  GetFragment = 'getFragment',
  SetBook = 'setBook',
}

export interface TMWorkerControls {
  [TMWorkerCommands.SetBook]: (bookContent: string) => void
  [TMWorkerCommands.SetIndexes]: (indexes: TMIndexes) => void
  [TMWorkerCommands.GetIndexes]: () => TMIndexes
  [TMWorkerCommands.GetFragment]: () => string;
}

export type TMIndexes = {
  sectionIndex: number;
  pIndex: number;
}

export interface TMOptions {
  bookContent: string,
  maxChar?: number,
  indexes?: TMIndexes
}