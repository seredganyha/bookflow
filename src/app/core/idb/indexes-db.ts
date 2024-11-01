import { IDBPDatabase, openDB } from "idb";

export type EntityWithId<T> = T & { id: number };

export class IndexesDB<Entity = unknown> {
  private db!: IDBPDatabase;
  private readonly dbInitialized: Promise<void>;

  constructor(
    private dbName: string, 
    private storeName: string,
    private indexes: string[] = []
  ) {
    this.dbInitialized = this.initDB();
  }

  private async initDB() {
    this.db = await openDB(this.dbName, 1, {
      upgrade: (db) => {
        const store = db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });

        for (const index of this.indexes) {
          store.createIndex(index, index, { unique: false });
        }
      },
    });
  }

  async add(entity: Entity): Promise<EntityWithId<Entity>> {
    await this.dbInitialized;
    try {
      const id = await this.db.put(this.storeName, entity);
      return { ...entity, id: id as number };
    }
    catch (error) {
      console.log(error);
      throw new Error('Could not add entity');
    }
  }

  async delete(id: number): Promise<number> {
    await this.dbInitialized;

    try {
      await this.db.delete(this.storeName, id);
      return id;
    }
    catch (error) {
      console.log(error);
      throw new Error('Could not delete entity');
    }
  }

  async get(id: number): Promise<EntityWithId<Entity>> {
    await this.dbInitialized;

    try {
      return this.db.get(this.storeName, id);
    }
    catch (error) {
      console.log(error);
      throw new Error('Could not get entity')
    }
  }

  async getAll(): Promise<EntityWithId<Entity>[]> {
    await this.dbInitialized;

    try {
      return this.db.getAll(this.storeName);
    }
    catch (error) {
      console.log(error);
      throw new Error('Could not get entities')
    }
  }

   async getByIndex(
    indexName: string,
    value: string | number,
  ): Promise<EntityWithId<Entity>[]> {
    await this.dbInitialized;

    try {
      return this.db.getAllFromIndex(this.storeName, indexName, value);
    }
    catch (error) {
      console.log(error);
      throw new Error('Could not get entities')
    }
  }
}
