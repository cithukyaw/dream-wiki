import { useEffect, useState } from 'react';
import { db, type Definition } from '@/lib/db';

// Merge all JSON files under src/data into a single object
function getMergedData(): Record<string, string[]> {
  const modules = import.meta.glob('@/data/*.json', {
    eager: true,
    import: 'default',
  }) as Record<string, Record<string, string[]>>;

  const merged: Record<string, string[]> = {};
  for (const mod of Object.values(modules)) {
    for (const [category, texts] of Object.entries(mod)) {
      if (!merged[category]) merged[category] = [];
      merged[category].push(...texts);
    }
  }
  return merged;
}

export function useDatabase() {
  const [isLoading, setIsLoading] = useState(true);
  const [definitions, setDefinitions] = useState<Definition[]>([]);

  useEffect(() => {
    async function initDatabase() {
      try {
        const count = await db.definitions.count();

        // Seed database with sample data if empty
        if (count === 0) {
          const entries: Definition[] = [];
          const data = getMergedData();
          for (const [category, texts] of Object.entries(data)) {
            for (const text of texts) {
              entries.push({ category, text });
            }
          }
          await db.definitions.bulkAdd(entries);
        }

        // Load all definitions
        const allDefinitions = await db.definitions.toArray();
        setDefinitions(allDefinitions);
      } catch (error) {
        console.error('Database initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    }

    initDatabase();
  }, []);

  return { definitions, isLoading };
}
