/**
 * client-only memory of the selected event category. Category selection has no URL, so we combine two mechanisms:
 *   • sessionStorage - cross-page memory, so returning to "/" from an event page
 *     (Back button or a breadcrumb Link) restores that category's event list
 *   • a pushed history entry (same URL) on select — so pressing Back from the
 *     event list returns to the 4 categories instead of leaving the site
 * the category is stored on the pushed entry (history.state.kdCat), which is authoritative for Back/Forward;
 * sessionStorage is the fallback for forward navigations (breadcrumb Links, search, direct link)
 */
export const CATEGORY_MEMORY_KEY = "kd-category";
export const CATEGORY_MEMORY_EVENT = "kd-category-change";

type CategoryState = { kdCat?: string } | null;

export function readCategory(): string | null {
  try {
    const fromHistory = (window.history.state as CategoryState)?.kdCat;
    if (fromHistory) return fromHistory;
    return sessionStorage.getItem(CATEGORY_MEMORY_KEY);
  } catch {
    return null;
  }
}

/**
 * home-page category pick: push a same-URL history entry so Back returns to the 4 categories,
 * and remember it for forward navigations back to "/"
 */
export function selectCategory(id: string): void {
  try {
    window.history.pushState({ ...window.history.state, kdCat: id }, "");
    sessionStorage.setItem(CATEGORY_MEMORY_KEY, id);
    window.dispatchEvent(new Event(CATEGORY_MEMORY_EVENT));
  } catch {}
}

/**
 * remember a category without touching history - used by event pages so that
 * returning to "/" restores the right category even via search/direct links
 */
export function rememberCategory(id: string): void {
  try {
    sessionStorage.setItem(CATEGORY_MEMORY_KEY, id);
  } catch {}
}

/**
 * forget the remembered category (no history change). Used by the "category" breadcrumb crumb on event pages
 * so it lands on the 4 categories, not the remembered event list
 */
export function forgetCategory(): void {
  try {
    sessionStorage.removeItem(CATEGORY_MEMORY_KEY);
    window.dispatchEvent(new Event(CATEGORY_MEMORY_EVENT));
  } catch {}
}

// "Start over" (root breadcrumb crumb): drop back to the 4 categories.
export function clearCategory(): void {
  try {
    if ((window.history.state as CategoryState)?.kdCat) {
      window.history.back(); // pop our pushed entry; popstate handler forgets it
    } else {
      sessionStorage.removeItem(CATEGORY_MEMORY_KEY);
      window.dispatchEvent(new Event(CATEGORY_MEMORY_EVENT));
    }
  } catch {}
}

export function subscribeCategory(callback: () => void): () => void {
  const onPopState = () => {
    try {
      // Back to the bare home entry - forget the remembered category so the 4
      // categories show (don't resurrect the event list from sessionStorage).
      if (
        location.pathname === "/" &&
        !(window.history.state as CategoryState)?.kdCat
      ) {
        sessionStorage.removeItem(CATEGORY_MEMORY_KEY);
      }
    } catch {}
    callback();
  };
  window.addEventListener("popstate", onPopState);
  window.addEventListener(CATEGORY_MEMORY_EVENT, callback);
  return () => {
    window.removeEventListener("popstate", onPopState);
    window.removeEventListener(CATEGORY_MEMORY_EVENT, callback);
  };
}
