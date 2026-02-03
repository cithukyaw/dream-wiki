import type { GroupedResults } from '@/hooks/useSearch';

interface SearchResultsProps {
  groupedResults: GroupedResults;
  query: string;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-primary/20 text-foreground rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function SearchResults({ groupedResults, query }: SearchResultsProps) {
  const categories = Object.keys(groupedResults);

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 space-y-6">
      {categories.map((category, categoryIndex) => (
        <div
          key={category}
          className="animate-fade-in-up"
          style={{ animationDelay: `${categoryIndex * 100}ms` }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="category-badge font-my">
              {capitalizeFirst(category)}
            </span>
            <span className="text-sm text-muted-foreground">
              {groupedResults[category].length} result{groupedResults[category].length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-3">
            {groupedResults[category].map((result, index) => (
              <div
                key={result.item.id || index}
                className="dream-card"
                style={{ animationDelay: `${(categoryIndex * 100) + (index * 50)}ms` }}
              >
                <p className="text-foreground leading-relaxed font-my">
                  {highlightMatch(result.item.text, query)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
