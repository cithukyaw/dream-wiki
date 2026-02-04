import { Toaster as Sonner, toast } from "sonner";
import { useEffect, useState } from "react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

function useResolvedTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">(() => {
    if (typeof document !== "undefined") {
      if (document.documentElement.classList.contains("dark")) return "dark";
      if (document.documentElement.classList.contains("light")) return "light";
    }
    return "system";
  });

  useEffect(() => {
    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    const update = () => {
      if (document.documentElement.classList.contains("dark")) setTheme("dark");
      else if (document.documentElement.classList.contains("light")) setTheme("light");
      else setTheme("system");
    };

    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    mql?.addEventListener?.("change", update as any);
    return () => {
      observer.disconnect();
      mql?.removeEventListener?.("change", update as any);
    };
  }, []);

  return theme;
}

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useResolvedTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
