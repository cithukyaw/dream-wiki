import { useEffect, useState } from 'react';
import { db, type Definition } from '@/lib/db';
import sampleData from '@/data/sampleData.json';

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
          for (const [category, texts] of Object.entries(sampleData)) {
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
