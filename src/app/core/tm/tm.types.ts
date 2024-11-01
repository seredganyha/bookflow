export type TMIndexes = {
  sectionIndex: number;
  pIndex: number;
}

export interface TMOptions {
  bookContent: string,
  maxChar?: number,
  indexes?: TMIndexes
}