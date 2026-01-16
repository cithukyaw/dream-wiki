import { Moon, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  query: string;
  hasSearched: boolean;
}

export function EmptyState({ query, hasSearched }: EmptyStateProps) {
  if (hasSearched && query.length >= 2) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-16 text-center animate-fade-in">
        <Moon className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
        <p className="text-xl text-muted-foreground font-display">
          No dreams found for "{query}"
        </p>
        <p className="text-muted-foreground/70 mt-2">
          Try a different search term
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-16 text-center animate-fade-in">
      <Sparkles className="h-12 w-12 mx-auto text-primary/40 mb-4" />
      <p className="text-lg text-muted-foreground">
        Start typing to explore the dream encyclopedia
      </p>
      <p className="text-sm text-muted-foreground/60 mt-2">
        Search through dreams, symbols, psychology, and more
      </p>
    </div>
  );
}
