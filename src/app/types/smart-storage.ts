export interface SmartStorage {
  getLocalStorageValueOrInitial<T>(key: string, defaultValue: T): T;
  saveToLocalStorage<T>(key: string, value: T): void;
}
