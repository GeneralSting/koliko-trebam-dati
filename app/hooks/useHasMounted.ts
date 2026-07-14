import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * true only after the first client render
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
