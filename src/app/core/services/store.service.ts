import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '../tokens/local-storage-token';
import { SmartStorage } from '../../types/smart-storage';

@Injectable({
  providedIn: 'root'
})
export class StoreService implements SmartStorage {

  constructor(@Inject(LOCAL_STORAGE) private storage: Storage) { }

  getLocalStorageValueOrInitial<T>(key: string, defaultValue: T): T {
    const storeValue = this.storage.getItem(key);
    return storeValue ? (JSON.parse(storeValue) as T) : defaultValue;
  }

  saveToLocalStorage<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }
}
