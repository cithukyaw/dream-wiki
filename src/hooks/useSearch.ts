import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import type { Definition } from '@/lib/db';

export interface SearchResult {
  item: Definition;
  refIndex: number;
  score?: number;
}

export interface GroupedResults {
  [category: string]: SearchResult[];
}

export function useSearch(definitions: Definition[]) {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => {
    return new Fuse(definitions, {
      keys: ['text', 'category'],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
    });
  }, [definitions]);

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) {
      return [];
    }
    return fuse.search(query);
  }, [fuse, query]);

  const groupedResults = useMemo(() => {
    const grouped: GroupedResults = {};
    for (const result of results) {
      const category = result.item.category;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(result);
    }
    return grouped;
  }, [results]);

  return {
    query,
    setQuery,
    results,
    groupedResults,
    hasResults: results.length > 0,
  };
}
