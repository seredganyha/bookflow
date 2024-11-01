import { TextManager } from "text-manager";
import { TMIndexes } from "./tm.types";

export class TM {
  private readonly textManager: TextManager;

  constructor() {
    this.textManager = new TextManager();
  }

  setIndexes (indexes: TMIndexes) {
    this.textManager.setIndexes(indexes);
  }

  getIndexes() {
    return this.textManager.getIndexes();
  }

  getFragment() {
    return this.textManager.getText()
  }

  async setBook(file: File) {
    const fileStr = await file.text();

    this.textManager.setFile(fileStr);
  }
}