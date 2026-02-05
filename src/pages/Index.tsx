import { SearchBox } from '@/components/SearchBox';
import { SearchResults } from '@/components/SearchResults';
import { EmptyState } from '@/components/EmptyState';
import { useDatabase } from '@/hooks/useDatabase';
import { useSearch } from '@/hooks/useSearch';
import { Wifi, WifiOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '../img/logo.png';

const Index = () => {
  const { definitions, isLoading } = useDatabase();
  const { query, setQuery, groupedResults, hasResults } = useSearch(definitions);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const dt = new Date();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen px-4 py-12 md:py-20">
      {/* Header */}
      <header className="text-center my-2 animate-slide-up">
        <div className="flex items-baseline justify-center gap-3 mb-4">
          <img src={logo} className="w-12" alt="DreamWiki" />
          <h1 className="text-5xl md:text-6xl font-display font-semibold text-foreground tracking-tight">
            DreamWiki
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-md mx-auto font-my">
          သင့်လက်ထဲက အိပ်မက်အဘိဓာန်
        </p>

        {/* Online/Offline indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {isOnline ? (
            <>
              <Wifi className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Online</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Offline mode</span>
            </>
          )}
        </div>
      </header>

      {/* Search */}
      <main className="max-w-4xl mx-auto">
        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <SearchBox
            value={query}
            onChange={setQuery}
            disabled={isLoading}
          />
        </div>

        {isLoading ? (
          <div className="w-full max-w-2xl mx-auto mt-16 text-center animate-fade-in">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
            <p className="text-muted-foreground mt-4">Loading database...</p>
          </div>
        ) : hasResults ? (
          <SearchResults groupedResults={groupedResults} query={query} />
        ) : (
          <EmptyState query={query} hasSearched={query.length > 0} />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center mt-20 text-sm text-muted-foreground/70">
        <p className="my">ဆရာဖြိုး၏ အိပ်မက်အဘိဓာန် စာအုပ်ကို ကိုးကားသည်။</p>
        <p>&copy;{dt.getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
