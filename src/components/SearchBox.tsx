import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SearchBox({ value, onChange, disabled }: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholders = [
    'ဆံပင်ညှပ်',
    'ကိုယ်ဝန်ဆောင်',
    'ဖိနပ်အသစ်',
    'Search the dream encyclopedia...'
  ];
  const [ph, setPh] = useState('Search the dream encyclopedia...');

  // typing animation controller
  const timersRef = useRef<number[]>([]);
  const animRef = useRef<{
    running: boolean;
    index: number; // which placeholder
    char: number; // current character position
    mode: 'typing' | 'erasing' | 'idle';
    target: string;
  }>({ running: false, index: 0, char: 0, mode: 'idle', target: '' });

  // helper to clear all scheduled timeouts
  const clearTimers = () => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  };

  // stop animation (e.g., when user types or gets disabled)
  const stopAnimation = () => {
    clearTimers();
    animRef.current = { running: false, index: animRef.current.index, char: 0, mode: 'idle', target: '' };
  };

  // main animation loop: type -> wait -> erase -> next -> repeat
  const schedule = (fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timersRef.current.push(id);
  };

  const startAnimation = () => {
    if (animRef.current.running) return;
    animRef.current.running = true;
    animRef.current.mode = 'typing';
    animRef.current.target = placeholders[animRef.current.index % placeholders.length] || '';
    animRef.current.char = 0;

    const typeStep = () => {
      const st = animRef.current;
      if (!st.running) return;
      if (st.mode !== 'typing') return;
      const nextChar = st.target.slice(0, st.char + 1);
      setPh(nextChar);
      st.char += 1;
      if (st.char < st.target.length) {
        schedule(typeStep, 50);
      } else {
        // typed full word, wait then erase
        schedule(() => {
          st.mode = 'erasing';
          eraseStep();
        }, 1200);
      }
    };

    const eraseStep = () => {
      const st = animRef.current;
      if (!st.running) return;
      if (st.mode !== 'erasing') return;
      const nextLen = Math.max(0, st.char - 1);
      const nextVal = st.target.slice(0, nextLen);
      setPh(nextVal || '');
      st.char = nextLen;
      if (st.char > 0) {
        schedule(eraseStep, 50);
      } else {
        // go to next placeholder after a short pause
        schedule(() => {
          st.index = (st.index + 1) % placeholders.length;
          st.target = placeholders[st.index];
          st.mode = 'typing';
          st.char = 0;
          typeStep();
        }, 400);
      }
    };

    // kick off typing
    schedule(typeStep, 1000);
  };

  // Start the typing demo once loading is done (disabled === false) and only when input is empty.
  useEffect(() => {
    // If disabled or user already typed something, stop demo
    if (disabled || (value && value.length > 0)) {
      stopAnimation();
      // restore default placeholder if user has input
      if (value && value.length > 0) {
        setPh('Search the dream encyclopedia...');
      }
      return;
    }
    // If enabled and empty, start demo
    if (!disabled && (!value || value.length === 0)) {
      startAnimation();
    }
    return () => {
      // cleanup on unmount or deps change
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, value]);

  // Ensure the search box is moved into view on mobile when the keyboard opens
  const handleFocus = () => {
    // stop placeholder animation once user focuses
    stopAnimation();
    // try to bring the input to the very top so results stay visible
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        // First, ensure the input itself is aligned to the top of viewport
        inputRef.current?.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
        // Then, nudge window to top shortly after to compensate for mobile keyboard viewport shifts
        window.setTimeout(() => {
          try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } catch {
            // no-op
          }
        }, 60);
      });
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-6 w-6 text-muted-foreground/50" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        placeholder={ph}
        disabled={disabled}
        className="dream-search-box pl-12 font-my"
        autoFocus
      />
    </div>
  );
}
