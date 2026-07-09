import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

// True only after the first client render. Lets a component defer viewport-
// dependent UI until mount, so it never renders the wrong variant during
// hydration (avoids a desktop→mobile flash). Uses useSyncExternalStore so the
// server/hydration snapshot is false and the client snapshot is true, with no
// setState-in-effect.
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
