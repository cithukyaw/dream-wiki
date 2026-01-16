import Dexie, { type EntityTable } from 'dexie';

export interface Definition {
  id?: number;
  category: string;
  text: string;
}

const db = new Dexie('DreamWikiDB') as Dexie & {
  definitions: EntityTable<Definition, 'id'>;
};

db.version(1).stores({
  definitions: '++id, category, text'
});

export { db };
