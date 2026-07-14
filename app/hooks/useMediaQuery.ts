import { useCallback, useSyncExternalStore } from "react";

/**
 * reactive CSS media query. SSR-safe: the server snapshot is `false`, and it
 * re-evaluates + subscribes to changes (e.g. resizing across a breakpoint)
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
