import { Search } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SearchBox({ value, onChange, disabled }: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      // wait a tick so focus happens after re-render/enabled
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [disabled]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <Search className="h-6 w-6 text-muted-foreground/50" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search the dream encyclopedia..."
        disabled={disabled}
        className="dream-search-box pl-14 font-my"
        autoFocus
      />
    </div>
  );
}
